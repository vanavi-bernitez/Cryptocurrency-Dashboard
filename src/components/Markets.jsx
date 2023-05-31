import React, { useState } from "react";
import { getMarket } from "../helpers/getCrypto";

const Markets = () => {
  const [data, setData] = useState([]);
  const [coinId, setCoinId] = useState("");

  const fillCoinCard = async () => {
    const coinsData = await getMarket();
    setData(coinsData);
    console.log(data.sparkline);
  };

  const handleOnClickImage = (event) => {
    const clickedImageId = event.target.getAttribute('id');
    console.log(clickedImageId)
    // setCoinId((prevImageId) => clickedImageId);
    // console.log(clickedImageId); //current value 
    //TODO: graph funtion?
  };

  if (data.length === 0) fillCoinCard();

  const coinItems = data.map((coin) => {
    return (
      <div className="infoContainer">
        <div className="logoContainer">
          <img
            className="coinLogo"
            id={`${coin.id}`}
            src={coin.image}
            alt="crypto symbol"
            onClick={handleOnClickImage}
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
