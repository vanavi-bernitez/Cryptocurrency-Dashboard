const getMarket = async () => {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=6&page=1&sparkline=false&locale=en`
    );
    const market = await response.json();
    const coinsData = market.map((coin) => {
      return {
        id: coin.id,
        symbol: coin.symbol,
        name: coin.name,
        image: coin.image,
        price: coin.current_price,
      };
    });

    return coinsData;
  } catch (error) {
    console.error("Error while getting cryptos", error);
  }
};

export { getMarket };
