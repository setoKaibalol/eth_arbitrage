const axios = require("axios")

const getPrices = async () => {
  const data = await axios.get(
    "https://apiv5.paraswap.io/prices/?srcToken=0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE&destToken=0x6b175474e89094c44da98b954eedeac495271d0f&amount=10000000000000000000&srcDecimals=18&destDecimals=18&side=SELL&network=1"
  )

  return data.data
}

const getToken = async () => {
  await axios.get("")
}

const getTransaction = async () => {
  let data = await getPrices()
  console.log(data)
  await axios({
    method: "post",
    url: `https://apiv5.paraswap.io/transactions/?gasPrice=${data.priceRoute.gasCost}&network=${data.priceRoute.network}`,
    headers: {},
    data: {
      srcToken: data.priceRoute.srcToken,
      srcDecimals: data.priceRoute.srcDecimals,
      destToken: data.priceRoute.destToken,
      destDecimals: data.priceRoute.destDecimals,
      srcAmount: data.priceRoute.srcAmount,
      destAmount: data.priceRoute.destAmount,
      priceRoute: data.priceRoute.bestRoute,
      slippage: 10000,
    },
  }).catch((err) => {
    console.log(err)
  })
}

getTransaction()
