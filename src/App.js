import React, { useState, useEffect } from "react";
// import BarGraph from "./components/BarGraph";
import BarGraph from "./components/trial";
// import BarGraph from "./components/newtest";
// import BarGraph from "./components/finaltest";
import Input from "./components/Input";
import axios from "axios";
import styled from "styled-components";
import { BACKEND_URL } from "./components/constants";

const Header = styled.h3`
  margin-left: 24%;
  margin-top: 2%;
`;
// const convertResultToFormat = (data,message) => {
//   const dataArray = Object.entries(data);
//   dataArray.sort((a, b) => (a[0] > b[0] ? 1 : -1));

//   const formattedData = dataArray.map(([date, value]) => {
//     const monthYear = new Date(date);
//     const label = `${monthYear.toLocaleString("default", {
//       month: "short",
//     })} ${String(monthYear.getFullYear()).slice(2)}`;

//     const betAmount=value.betAmount;
//       const payout=value.payout;
//       const profit=value.profit;
//       const flag=message.split(" ").slice(1).join(" ");
//       if(flag==='RTP'){
//         const RTP=value;
//         return {label, RTP}
//       }
//       else if(flag ==='Bet Count'){
//         const betCount=value;
//         return {label,betCount}
//       }
//       else if(flag==='Player Count'){
//         const playerCount=value;
//         return {label,playerCount}
//       }
//       else if(typeof betAmount !== "undefined"){
//         console.log({label,betAmount,payout,profit})
//         return {label,betAmount,payout,profit}
//       }
//       // return { label, value };
//   });

//   return formattedData;
// };

const App = () => {
  const [payload, setPayload] = useState({});
  const [result, setResult] = useState({});
  const [display, setDisplay] = useState(false);
  // const [dynamicDataKey, setDynamicDataKey] = useState("");

  const convertResultToFormat = (data, message) => {
    const dataArray = Object.entries(data);
    dataArray.sort((a, b) => (a[0] > b[0] ? 1 : -1));

    const formattedData = dataArray.map(([date, value]) => {
      const monthYear = new Date(date);
      const label = `${monthYear.toLocaleString("default", {
        month: "short",
      })} ${String(monthYear.getFullYear()).slice(2)}`;

      const BetAmount = value.betAmount;
      const Payout = value.payout;
      const GGR = value.profit;
      const flag = message.split(" ").slice(1).join(" ");
      // setDynamicDataKey(flag)
      if (flag === "RTP") {
        const RTP = value;
        // setDynamicDataKey("RTP")
        console.log({ label, RTP });
        return { label, RTP };
      } else if (flag === "Bet Count") {
        const betCount = value;
        // setDynamicDataKey("betCount")
        return { label, betCount };
      } else if (flag === "Player Count") {
        const playerCount = value;
        // setDynamicDataKey("playerCount")
        return { label, playerCount };
      } else if (typeof BetAmount !== "undefined") {
        console.log("testing",{ label, BetAmount, Payout, GGR });
        return { label, BetAmount, Payout, GGR };
      }
      // return { label, value };
    });

    return formattedData;
  };

  const handleData = (data) => {
    setPayload(data);
  };

  useEffect(() => {
    console.log("payload in App", payload);
    const fetchData = async () => {
      try {
        const baseUrl = BACKEND_URL;
        console.log(process.env.REACT_APP_BACKEND_URL, "baseUrl");
        const queryParams = {
          startDate: payload.startDate,
          endDate: payload.endDate,
          game: payload.game,
          gameInfo: payload.gameInfo,
        };

        console.log("queryParams", queryParams);
        const results = await axios.get(baseUrl, { params: queryParams });
        console.log("api ka result", results.data);
        setResult(results.data);
        setDisplay(true);
      } catch (err) {
        console.error("error fetching data");
      }
    };
    payload.game && fetchData();
  }, [payload]);

  const data = display && convertResultToFormat(result.data, result.message);
  // console.log(dynamicDataKey, "---------ddddd--------");
  return (
    <div>
      <Input onDataReady={handleData} />
      {display && (
        <BarGraph
          data={data}
          header={result.message}
          gameInfo={payload.gameInfo}
          dynamicDataKey={
            typeof payload.gameInfo === "string" ?
            (payload.gameInfo === "Bet Count" ? "betCount" :
             payload.gameInfo === "Player Count" ? "playerCount" :
             payload.gameInfo === "RTP" ? "RTP" :
             null)
            : null
          }
        />
      )}
      {!display && <Header>Please fill the above fields to continue</Header>}
    </div>
  );
};

export default App;
