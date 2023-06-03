import React from "react";
import { getMarket } from "../helpers/getCrypto";

const Markets = ({ onDataChange, onIdChange, data }) => {
  const fillCoinCard = async () => {
    const coinsData = await getMarket();
    onDataChange(coinsData);
  };

  const handleOnClickImage = (key) => {
    onIdChange(key);
  };

  if (data.length === 0) fillCoinCard();

  const coinItems = data.map((coin) => {
    return (
      <div
        className="infoContainer"
        key={coin.id}
        onClick={() => handleOnClickImage(coin.id)}
      >
        <div className="logoContainer">
          <img className="coinLogo" src={coin.image} alt="crypto symbol" />
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
