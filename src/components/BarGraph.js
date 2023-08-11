import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
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
      <BarChart width={1000} height={400} data={data} >
        <CartesianGrid strokeDasharray="3 3"/>
        {/* <XAxis dataKey="label" /> */}
        <XAxis
          dataKey="label"
          angle={-90}
          interval={0}
          tickMargin={25}
          style={{ fontSize: "12px" }}
          height={60}
        />
        {/* <YAxis ticks={yTicks} /> */}
        <YAxis
          // domain={[0, "dataMax"]} // Set the Y-axis domain dynamically
          domain={['auto', 'auto']}
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
        {/* <Legend/> */}
        {/* <Legend width={100} wrapperStyle={{ top: 0, left: 0, backgroundColor: '#f5f5f5', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '40px' }}/> */}
        {/* <Legend
          layout="vertical"
          verticalAlign="top"
          align="right"
        /> */}
        
        <Bar dataKey="value" fill="#8884d8"  />
      </BarChart>
    </Container>
  );
};

export default BarGraph;
