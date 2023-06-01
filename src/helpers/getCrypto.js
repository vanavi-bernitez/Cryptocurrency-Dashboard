import market from "../testData.json";

const getMarket = async () => {
  try {
    // const response = await fetch(
    //   `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true&locale=en&precision=2`
    // );

    // const market = await response.json();
    const coinsData = market.map((coin) => {
      const formatedSparkline = coin.sparkline_in_7d.price.map(
        (price, index) => ({ x: index, y: price })
      );
      return {
        id: coin.id,
        symbol: coin.symbol,
        name: coin.name,
        image: coin.image,
        price: coin.current_price,
        sparkline: formatedSparkline,
      };
    });

    return coinsData;
  } catch (error) {
    console.error("Error while getting cryptos", error);
  }
};

export { getMarket };
