const getSearch = async (searchedInput) => {
  const response = await fetch(
    `https://api.coingecko.com/api/v3/search?query=${searchedInput}`
  );

  const coinsResponse = await response.json();
  const coins = coinsResponse.coins;
  const coinsId = coins.map((coin) => coin.id);
  const coinsIdString = coinsId.join(",");
  return coinsIdString;
};

export { getSearch };
