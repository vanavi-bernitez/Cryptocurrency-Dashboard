import React, { useState, useEffect } from "react";
import { getQueriedCrypto } from "../helpers/getQueriedCrypto";
import { VictoryBar, VictoryChart, VictoryAxis } from "victory";

const GraphCurrency = ({ initialData, idGraph }) => {
  const [idCoinData, setIdCoinData] = useState([]);
  const [minY, setMinY] = useState(24000);
  const [maxY, setMaxY] = useState(28000);

  let formatedData;
  idGraph === null
    ? (formatedData = initialData[0])
    : (formatedData = idCoinData);

  // console.log(formatedData?.minY, formatedData?.maxY, formatedData?.averageY);
  console.log(minY);
  console.log(maxY);

  const fillGraph = async (idCoinToGraph) => {
    const coinQueryData = await getQueriedCrypto(idCoinToGraph);
    setIdCoinData(coinQueryData[0]);
    setMinY(coinQueryData[0].minY);
    setMaxY(coinQueryData[0].maxY);
  };

  useEffect(() => {
    if (idGraph) {
      fillGraph(idGraph);
    }
  }, [idGraph]);

  return (
    <div className="graphicContainer">
      <VictoryChart
        domain={{ x: [0, 35], y: [minY, maxY] }}
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
        <VictoryAxis orientation="top" />
        {/* <VictoryAxis dependentAxis domain={[25000, 27000]} /> */}
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
