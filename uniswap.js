const axios = require("axios");

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
  