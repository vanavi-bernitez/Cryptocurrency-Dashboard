import React, { useState } from "react";

import { getMarket } from "../helpers/getCrypto";

const Markets = () => {
  const [data, setData] = useState([]);

  const fillCoinCard = async () => {
    const coinsData = await getMarket();
    setData(coinsData);
    console.log(data);
  };

  if (data.length === 0) fillCoinCard();

  const coinItems = data.map((coin) => {
    return (
      <div className="infoContainer">
        <div className="logoContainer">
          <img
            className="coinLogo"
            id={`${coin.symbol}`}
            src={coin.image}
            alt="crypto symbol"
          />
        </div>

        <div className="coinInformation">
          <div className="nameValue">
            <h3>{coin.name}</h3>
            <p>${coin.price}</p>
          </div>
          <p>{coin.symbol}</p>
        </div>
      </div>
    );
  });

  return <div className="coins">{coinItems}</div>;
};

export { Markets };
