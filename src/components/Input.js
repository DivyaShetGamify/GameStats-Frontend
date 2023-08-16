import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { GAMENAMES } from "./constants";

const Container = styled.div`
  margin-top: 5%;
  margin-left: 10%;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Label = styled.label`
  font-weight: bold;
`;

const DateInput = styled.input`
  padding: 2px;
  width: 140px;
`;

const Select = styled.select`
  padding: 5px;
`;

const Option = styled.option``;

const Button = styled.button``;

const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
  margin-top: 5px;
`;

const Input = ({ onDataReady }) => {
  const [payload, setPayload] = useState({
    startDate: "",
    endDate: "",
    game: "God Of Fortune",
    gameInfo: "Bet Count",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setPayload((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  useEffect(() => {
    payload.endDate &&
    payload.startDate &&
    new Date(payload.endDate).getTime() < new Date(payload.startDate).getTime()
      ? setError("End Date should be greater than Start Date")
      : setError("");
  }, [payload]);

  const handleClick = () => {
    onDataReady(payload);
    console.log(payload);
  };

  return (
    <Container>
      <Label>Game Name</Label>
      <Select name="game" value={payload.game} onChange={handleChange}>
        {Object.values(GAMENAMES).map((value) => (
          <Option key={value} value={value}>
            {value}
          </Option>
        ))}
      </Select>
      <Label>From</Label>
      <DateInput
        type="month"
        name="startDate"
        value={payload.startDate}
        onChange={handleChange}
      />
      <Label>To</Label>
      <DateInput
        type="month"
        name="endDate"
        value={payload.endDate}
        onChange={handleChange}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <div style={{ margin: "10px 0" }} />

      <Select name="gameInfo" value={payload.gameInfo} onChange={handleChange}>
        <Option value="Bet Count">Bet Count</Option>
        <Option value="Player Count">Player Count</Option>
        <Option value="RTP">RTP</Option>
        <Option value="Bet Amount">Bet Amount | Payout | Profit</Option>
      </Select>
      <Button onClick={handleClick}>Display Graph</Button>
    </Container>
  );
};

export default Input;
