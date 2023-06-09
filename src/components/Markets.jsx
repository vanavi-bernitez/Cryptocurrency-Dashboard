import React from "react";

const Markets = ({ onIdChange, data }) => {
  const handleOnClickImage = (key) => {
    onIdChange(key);
  };

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
            <p>
              $
              {coin.price
                .toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
                .replace(".", ",")}
            </p>
          </div>
          <p>{coin.symbol}</p>
        </div>
      </div>
    );
  });

  return <div className="coins">{coinItems}</div>;
};

export { Markets };
