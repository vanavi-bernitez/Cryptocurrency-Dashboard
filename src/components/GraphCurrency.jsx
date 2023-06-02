import React, { useState, useEffect } from "react";
import { getQueriedCrypto } from "../helpers/getQueriedCrypto";
import { VictoryBar, VictoryChart, VictoryAxis } from "victory";

const GraphCurrency = ({ initialData, idGraph }) => {
  const [idCoinData, setIdCoinData] = useState(null);
  let formatedData;
  idGraph === null ? (formatedData = initialData) : (formatedData = idCoinData);

  const fillGraph = async (idCoinToGraph) => {
    const coinQueryData = await getQueriedCrypto(idCoinToGraph);
    setIdCoinData(coinQueryData);
    console.log(coinQueryData);
  };

  useEffect(() => {
    if (idGraph) {
      fillGraph(idGraph);
    }
  }, [idGraph]);

  return (
    <div className="graphicContainer">
      <VictoryChart domain={{ x: [0, 50] }} width={700} height={300}>
        <VictoryAxis dependentAxis={false} />
        <VictoryBar
          style={{ data: { fill: "#5f606c" } }}
          data={formatedData?.sparkline}
          animate={{
            onExit: {
              duration: 1000,
            },
          }}
        />
      </VictoryChart>
      <p>{formatedData?.price}</p>
    </div>
  );
};

export { GraphCurrency };
