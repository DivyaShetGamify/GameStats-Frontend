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
  console.log(gameInfo);
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
        <Tooltip />

        {data[0].value["profit"] ? (
          <>
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
          <Bar dataKey="value" fill="#8884d8" />
        )}
      </BarChart>
    </Container>
  );
};

export default BarGraph;
