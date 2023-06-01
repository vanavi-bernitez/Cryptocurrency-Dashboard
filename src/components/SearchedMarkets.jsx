import React from "react";

const SearchedMarkets = ({ queriedData }) => {
  const handleOnClickImage = (event) => {
    const clickedImageId = event.target.getAttribute("id");
    console.log(clickedImageId);
  
  };
  const coinItems = queriedData.map((coin) => {
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

export { SearchedMarkets };
