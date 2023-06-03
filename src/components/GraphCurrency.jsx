import React, { useState, useEffect } from "react";
import { getQueriedCrypto } from "../helpers/getQueriedCrypto";
import { VictoryBar, VictoryChart, VictoryAxis } from "victory";

const GraphCurrency = ({ initialData, idGraph }) => {
  const [idCoinData, setIdCoinData] = useState([]);
  let formatedData;
  idGraph === null
    ? (formatedData = initialData[0])
    : (formatedData = idCoinData);

  const fillGraph = async (idCoinToGraph) => {
    const coinQueryData = await getQueriedCrypto(idCoinToGraph);
    setIdCoinData(coinQueryData[0]);
  };

  useEffect(() => {
    if (idGraph) {
      fillGraph(idGraph);
    }
  }, [idGraph]);

  return (
    <div className="graphicContainer">
      <VictoryChart
        domain={{ x: [0, 35] }}
        width={700}
        height={300}
        events={[
          {
            childName: ["barChart"],
            target: "data",
            eventHandlers: {
              onMouseOver: () => {
                return [
                  {
                    childName: "barChart",
                    mutation: (props) => {
                      return {
                        style: Object.assign({}, props.style, {
                          fill: "#c1ee14",
                        }),
                      };
                    },
                  },
                ];
              },
              onMouseOut: () => {
                return [
                  {
                    childName: ["barChart"],
                    mutation: () => {
                      return null;
                    },
                  },
                ];
              },
            },
          },
        ]}
      >
        <VictoryAxis dependentAxis={false} />
        <VictoryBar
          name="barChart"
          barWidth={5}
          style={{ data: { fill: "#5f606c" } }}
          data={formatedData?.sparkline}
          animate={{
            onExit: {
              duration: 1000,
            },
          }}
        />
      </VictoryChart>
      <p id="graphPrice">{formatedData?.price}</p>
    </div>
  );
};

export { GraphCurrency };
