const axios = require("axios");

const address = "0xd5FBDa4C79F38920159fE5f22DF9655FDe292d47";

const getPrices = async () => {
  const data = await axios
    .get(
      "https://apiv5.paraswap.io/prices/?srcToken=0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE&destToken=0x6b175474e89094c44da98b954eedeac495271d0f&amount=100000000000000000&srcDecimals=18&destDecimals=18&side=SELL&network=1"
    )
    .catch((err) => {
      console.log(err);
    });

  return data.data;
};

const queryUniswapPrices = async () => {
  let queryStr = {
    query: `{
    pools (
      first: 10,
      orderBy: totalValueLockedETH,
      orderDirection: desc  
    ) {
      id,
      token0Price
      token1Price
      token0{symbol,name},
      token1{symbol,name}
    }
  }`,
  };

  let headers = {};

  const ethPrice = await axios({
    method: "post",
    url: "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3",
    data: queryStr,
    headers: headers ,
  }).catch((err) => console.log(err.response.data));

  console.log(ethPrice.data.data.pools)
};

const queryParaswapPrices = async () => {
  const ethPrice = await axios.get(
    "https://apiv5.paraswap.io/prices/?srcToken=eth&destToken=usdt&amount=1000000000000000000&srcDecimals=18&destDecimals=18&side=SELL&network=1"
  );

  console.log(ethPrice.data.priceRoute.srcUSD);
  return ethPrice.data.priceRoute.srcUSD;
};

const weiToUsd = async (wei) => {
  const ethPrice = await queryParaswapPrices();

  const eth = Number(wei) / 1000000000000000000;
  const USD = eth * Number(ethPrice);
  console.log(USD);
  return USD;
};

const getTransaction = async () => {
  let data = await getPrices();
  await axios({
    method: "post",
    url: `https://apiv5.paraswap.io/transactions/${data.priceRoute.network}`,
    headers: {},
    data: {
      srcToken: data.priceRoute.srcToken,
      srcDecimals: data.priceRoute.srcDecimals,
      destToken: data.priceRoute.destToken,
      destDecimals: data.priceRoute.destDecimals,
      srcAmount: data.priceRoute.srcAmount,
      destAmount: data.priceRoute.destAmount,
      userAddress: address,
      priceRoute: data.priceRoute,
    },
  })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log("2", err);
    });
};

queryUniswapPrices()
weiToUsd(10000000000000000);
setInterval(queryParaswapPrices, 10000);
