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

const BarGraph = ({ data, header }) => {
  return (
    <Container>
      <h1>{header}</h1>
      <BarChart width={1000} height={400} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        {/* <XAxis dataKey="label" /> */}
        <XAxis
          dataKey="label"
          angle={-90}
          interval={0}
          tickMargin={25}
          style={{ fontSize: "12px" }}
        />
        {/* <YAxis ticks={yTicks} /> */}
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="rgba(75,192,192,0.4)" />
      </BarChart>
    </Container>
  );
};

export default BarGraph;
