import React, { useState, useEffect } from "react";
import { getQueriedCrypto } from "../helpers/getQueriedCrypto";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryLine } from "victory";

const GraphCurrency = ({ initialData, idGraph }) => {
  const [idCoinData, setIdCoinData] = useState([]);
  const [averageY, setAverageY] = useState(26500);

  const [minYValue, setMinYValue] = useState(25500);
  const [maxYValue, setMaxYValue] = useState(28000);
  
  // console.log(initialData[0].maxY, initialData[0].minY);

  let formatedData;
  idGraph !== null
    ? (formatedData = idCoinData)
    : (formatedData = initialData.length >= 0 ? initialData[0] : null);

  useEffect(() => {
    const fillGraph = async () => {
      const coinQueryData = await getQueriedCrypto(idGraph);
      setIdCoinData(coinQueryData[0]);
      setAverageY(coinQueryData[0].averageY);
      setMinYValue(coinQueryData[0].minY);
      setMaxYValue(coinQueryData[0].maxY);
    };

    if (idGraph) {
      fillGraph();
    }
  }, [idGraph]);

  return (
    <div className="graphicContainer">
      <VictoryChart
        domainPadding={{ y: 50 }}
        domain={{ x: [0, 35], y: [minYValue, maxYValue]}}
        width={750}
        height={400}
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
        <VictoryAxis
          orientation="top"
          tickValues={[0, 7, 14, 21, 28, 35]}
          tickFormat={["+ w1", "+ w2", "+w3", "+w4", "+ w5"]}
          style={{ axis: { stroke: "#757575", strokeDasharray: "4" } }}
        />

        <VictoryLine
          data={[
            { x: 0, y: averageY },
            { x: 35, y: averageY },
          ]}
          style={{ data: { stroke: "#c1ee14", strokeDasharray: "4" } }}
        />

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

      <h6 id="graphPrice">{formatedData?.price} USD</h6>
    </div>
  );
};

export { GraphCurrency };
