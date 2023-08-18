import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label,
} from "recharts";
import styled from "styled-components";

const Container = styled.div`
  margin-top: 5%;
  margin-left: 13%;
`;

const BarGraph = ({ header, gameInfo, data, dynamicDataKey }) => {
  console.log(data, "----------data /////////");
  console.log("hello", dynamicDataKey);

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
            // dx: -3,
            dy: 13,
            fontSize: 14,
            fill: "#000000",
            style: { marginLeft: "40px" },
          }}
          style={{ fontSize: "10px", marginLeft: "200px" }}
          //   tickFormatter={(value) => {
          //     if (value >= 1000) {
          //       return `${(value / 1000).toFixed(1)}k`;
          //     }
          //     return value;
          //   }}
          tickFormatter={(value) => {
            if (value >= 1000) {
              const formattedValue = (value / 1000).toFixed(1);
              return formattedValue.endsWith(".0")
                ? formattedValue.slice(0, -2) + "k"
                : formattedValue + "k";
            }
            return value;
          }}
          //   tickFormatter={(value) => value.toLocaleString()}
          //   tickFormatter={(value) => `${value}`} // Format Y-axis tick labels
        />

        {typeof data[0].BetAmount === "undefined" ? (
          <>
            <Tooltip
              content={({ payload, label, active }) => {
                if (active) {
                  const rtpValue = payload.find(
                    (entry) => entry.dataKey === "RTP"
                  )
                    ? payload
                        .find((entry) => entry.dataKey === "RTP")
                        .value.toLocaleString()
                    : null;
                  const betCountValue = payload.find(
                    (entry) => entry.dataKey === "betCount"
                  )
                    ? payload
                        .find((entry) => entry.dataKey === "betCount")
                        .value.toLocaleString()
                    : null;
                  const playerCountValue = payload.find(
                    (entry) => entry.dataKey === "playerCount"
                  )
                    ? payload
                        .find((entry) => entry.dataKey === "playerCount")
                        .value.toLocaleString()
                    : null;

                  const content =
                    dynamicDataKey === "RTP"
                      ? `RTP: ${rtpValue}%`
                      : dynamicDataKey === "betCount"
                      ? `Bet Count: ${betCountValue}`
                      : dynamicDataKey === "playerCount"
                      ? `Player Count: ${playerCountValue}`
                      : null;

                  return (
                    <>
                      <div style={{ fontSize: "14px", marginBottom: "5px" }}>
                        {label}
                      </div>
                      <div style={{ fontSize: "14px" }}>{content}</div>
                    </>
                  );
                }
                return null;
              }}
            />

            <Bar dataKey={dynamicDataKey} fill="#8884d8" />
          </>
        ) : (
          <>
            <Tooltip
              content={({ payload, label, active }) => {
                if (active) {
                  const payoutValue = payload
                    .find((entry) => entry.dataKey === "Payout")
                    .value.toLocaleString();
                  const GGRValue = payload
                    .find((entry) => entry.dataKey === "GGR")
                    .value.toLocaleString();

                  return (
                    <>
                      <div style={{ fontSize: "14px", marginBottom: "5px" }}>
                        {label}
                      </div>
                      <div style={{ fontSize: "14px",marginBottom: "5px" }}>
                        Payout: {payoutValue}
                      </div>
                      <div style={{ fontSize: "14px" }}>
                        GGR: {GGRValue}
                      </div>
                    </>
                  );
                }
              }}
            />
            <Legend
              verticalAlign="top"
              height={36}
              payload={[
                { value: "Payout", type: "line", color: "#8884d8" },
                { value: "GGR", type: "line", color: "#82ca9d" },
              ]}
            />
            {/* <Bar dataKey="BetAmount" fill="#8884d8" stackId="a" /> */}
            <Bar dataKey="Payout" fill="#8884d8" stackId="a" />
            <Bar dataKey="GGR" fill="#82ca9d" stackId="a" />
          </>
        )}
      </BarChart>
    </Container>
  );
};

export default BarGraph;
