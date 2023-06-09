const getQueriedCrypto = async (inputQuery) => {
  try {
    const encodedInput = encodeURIComponent(inputQuery);
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${encodedInput}&order=market_cap_desc&per_page=10&page=1&sparkline=true&locale=en&precision=2`
    );

    const market = await response.json();
    const coinsData = market.map((coin) => {
      const formatedSparkline = coin.sparkline_in_7d.price.map(
        (price, index) => ({ x: index, y: price })
      );
      const maxY = Math.max(...coin.sparkline_in_7d.price);
      const minY = Math.min(...coin.sparkline_in_7d.price);
      const averageY =
        formatedSparkline.reduce((sum, point) => sum + point.y, 0) /
        formatedSparkline.length;

      return {
        id: coin.id,
        symbol: coin.symbol,
        name: coin.name,
        image: coin.image,
        price: coin.current_price,
        sparkline: formatedSparkline,
        maxY,
        minY,
        averageY,
      };
    });

    return coinsData;
  } catch (error) {
    throw new Error("An error occurred during data fetching.");
  }
};

export { getQueriedCrypto };
