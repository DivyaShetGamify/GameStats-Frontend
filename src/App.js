import React, { useState, useEffect } from "react";
import BarGraph from "./components/BarGraph";
import Input from "./components/Input";
import axios from "axios";
import styled from "styled-components";
import { BACKEND_URL } from "./components/constants";

const Header = styled.h3`
  margin-left: 24%;
  margin-top: 2%;
`;
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

  const data = display && convertResultToFormat(result.data);
  return (
    <div>
      <Input onDataReady={handleData} />
      {display && (
        <BarGraph
          data={data}
          header={result.message}
          gameInfo={payload.gameInfo}
        />
      )}
      {!display && <Header>Please fill the above fields to continue</Header>}
    </div>
  );
};

export default App;
