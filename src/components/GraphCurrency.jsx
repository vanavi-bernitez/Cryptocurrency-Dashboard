import { VictoryBar, VictoryChart, VictoryAxis, VictoryLine } from "victory";

const GraphCurrency = ({
  initialData,
  idGraph,
  idCoinData,
  minYValue,
  maxYValue,
}) => {
  let formatedData;
  idGraph !== null
    ? (formatedData = idCoinData)
    : (formatedData = initialData.length >= 0 ? initialData[0] : null);

  return (
    <div className="graphicContainer">
      <VictoryChart
        domainPadding={{ y: 50 }}
        domain={{
          x: [0, 35],
          y: [minYValue, maxYValue],
        }}
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
            { x: 0, y: formatedData?.averageY },
            { x: 35, y: formatedData?.averageY },
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
              duration: 300,
            },
          }}
        />
      </VictoryChart>

      <h6 id="graphPrice">
        {formatedData?.price}
        {" "}
        USD
      </h6>
    </div>
  );
};

export { GraphCurrency };
