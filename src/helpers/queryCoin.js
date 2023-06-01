const queryCoin = (data, inputQuery) => {
  return data.filter((coinData) =>
    coinData.name.toLowerCase().startsWith(inputQuery.toLowerCase())
  );
};

export { queryCoin };
