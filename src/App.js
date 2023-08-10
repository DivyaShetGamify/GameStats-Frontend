import React, { useState, useEffect } from "react";
import BarGraph from "./components/BarGraph";
import Input from "./components/Input";
import axios from "axios";
import styled from "styled-components";
import {BACKEND_URL} from './components/constants'

// const results = {
//   isError: false,
//   message: "Every month's betCount",
//   data: {
//     "2023-06-01": 6199559,
//     "2022-10-01": 1294548,
//     "2022-07-01": 548607,
//     "2022-11-01": 2115345,
//     "2022-05-01": 96918,
//     "2023-03-01": 2509,
//     "2022-04-01": 49322,
//     "2022-08-01": 309474,
//     "2022-02-01": 243519,
//     "2022-09-01": 280407,
//     "2023-02-01": 1,
//     "2023-01-01": 1723,
//     "2023-05-01": 4413499,
//     "2022-12-01": 1998771,
//     "2022-03-01": 361719,
//     "2023-04-01": 3903591,
//     "2022-06-01": 49016,
//   },
// };

const Header = styled.h3`
  margin-left: 24%;
  margin-top: 2%;
`;
// const yTicks = [0, 50000, 100000, 150000, 200000, 445677, 700000, 800000]; // Define your custom y-axis values here
const convertResultToFormat = (data) => {
  const dataArray = Object.entries(data);
  dataArray.sort((a, b) => (a[0] > b[0] ? 1 : -1));

  const formattedData = dataArray.map(([date, value]) => {
    const monthYear = new Date(date);
    const label = `${monthYear.toLocaleString("default", {
      month: "short",
    })} ${String(monthYear.getFullYear()).slice(2)}`;

    return { label, value };
  });

  return formattedData;
};

const App = () => {
  const [payload, setPayload] = useState({});
  const [result, setResult] = useState({});
  const [display, setDisplay] = useState(false);

  const handleData = (data) => {
    setPayload(data);
  };

  useEffect(() => {
    console.log("payload in App", payload);
    const fetchData = async () => {
      try {
        const baseUrl = BACKEND_URL;
        console.log(process.env.REACT_APP_BACKEND_URL,"baseUrl");
        const queryParams = {
          startDate: payload.startDate,
          endDate: payload.endDate,
          game: payload.game,
          gameInfo: payload.gameInfo,
        };
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

  const data = display && convertResultToFormat(result.data);
  return (
    <div>
      <Input onDataReady={handleData} />
      {display && <BarGraph data={data} header={result.message} />}
      {!display && <Header>Please fill the above fields to continue</Header>}
    </div>
  );
};

export default App;
