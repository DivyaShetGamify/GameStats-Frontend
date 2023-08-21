import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import styled from "styled-components";

const Container = styled.div`
  margin-top: 5%;
  margin-left: 13%;
`;

const BarGraph = ({ data, header, gameInfo }) => {
  // console.log(gameInfo);

  return (
    <Container>
      <h1>{header}</h1>
      <BarChart width={1000} height={400} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="label"
          angle={-90}
          interval={0}
          tickMargin={25}
          style={{ fontSize: "12px" }}
          height={60}
        />
        <YAxis
          domain={["auto", "auto"]}
          label={{
            value: gameInfo,
            angle: -90,
            position: "insideLeft",
            dx: -5,
            dy: 13,
            fontSize: 14,
            fill: "#000000",
          }}
          style={{ fontSize: "10px" }}
          tickFormatter={(value) => `${value}`} // Format Y-axis tick labels
        />

        {data[0].value["profit"] ? (
          <>
            <Tooltip
              content={({ payload, label, active }) => {
                if (active) {
                  const payoutValue = payload.find(
                    (entry) => entry.dataKey === "value['payout']"
                  ).value;
                  const profitValue = payload.find(
                    (entry) => entry.dataKey === "value['profit']"
                  ).value;
                  // const betAmountValue = payoutValue + profitValue; // Calculate the betAmount
                  const betAmountValue = payload.find(
                    (entry) => entry.dataKey === "value['payout']"
                  ).payload.value.betAmount;

                  return (
                    <div
                      style={{
                        backgroundColor: "#f5f5f5",
                        border: "1px solid #d5d5d5",
                        padding: "10px",
                        fontSize: "14px",
                      }}
                    >
                      <p>{`${label}`}</p>
                      <p
                        style={{ color: "#8884d8" }}
                      >{`Payout: ${payoutValue}`}</p>
                      <p
                        style={{ color: "#82ca9d" }}
                      >{`Profit: ${profitValue}`}</p>
                      <p>{`Bet Amount: ${betAmountValue}`}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend
              verticalAlign="top"
              height={36}
              payload={[
                { value: "Payout", type: "line", color: "#8884d8" },
                { value: "Profit", type: "line", color: "#82ca9d" },
              ]}
            />
            <Bar dataKey="value['payout']" fill="#8884d8" stackId="a" />
            <Bar dataKey="value['profit']" fill="#82ca9d" stackId="a" />
          </>
        ) : (
          <>
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" />
          </>
        )}
      </BarChart>
    </Container>
  );
};

export default BarGraph;
