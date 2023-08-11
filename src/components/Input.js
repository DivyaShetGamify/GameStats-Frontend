import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { GAMENAMES } from "./constants";

// const games = {
//   GOD_OF_FORTUNE: "God Of Fortune",
//   WILD_WEST_SALOON: "Wild West Saloon",
//   SAKURA_NEKO: "Sakura Neko",
//   SUGARY_BONANZA: "Sugary Bonanza",
//   PERSIAN_GEMS: "Persian Gems",
//   QUEEN_OF_AZTEC: "Queen of Aztec",
//   STALLION_PRINCESS: "Stallion Princess",
//   MAHJONG_FORTUNE: "Mahjong Fortune",
//   GATES_OF_KUNLUN: "Gates of Kunlun",
//   SANGUO: "SanGuo - The Brotherhood",
//   MERMAID_TREASURE: "Mermaid's Treasure",
//   LONGEVITY_DRAGON: "Longevity dragon",
//   MYSTERIES_OF_PANDORA: "Mysteries of Pandora",
//   STEAMPUNK_RELOADED: "Steampunk Reloaded",
//   LEGENDARY_EL_TORO: "Legendary El Toro",
//   KAWAII_NEKO: "Kawaii Neko",
//   BIKINI_BABES: "Bikini Babes",
//   SEXY_CHRISTMAS_SIRENS: "Sexy Christmas Sirens",
//   SPRING_HARVEST: "Spring Harvest",
//   AMAZING_CIRCUS: "Amazing Circus",
//   APHRODITE: "Aphrodite - Goddess of Love",
//   SUPER_PHOENIX: "Super Phoenix",
//   CHASING_LEPRECHAUN_COINS: "Chasing Leprechaun Coins",
//   TEMPLE_OF_GODS: "Temple Of Gods",
//   MOCHI_MOCHI: "Mochi Mochi",
// };

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
    gameInfo: "betCount",
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
        <Option value="betCount">Bet Count</Option>
        <Option value="playerCount">Player Count</Option>
        <Option value="rtp">RTP</Option>
        <Option value="betAmount">Bet Amount - Payout = Profit</Option>
        {/* <Option value="payout">Payout</Option> */}
        {/* <Option value="profit">Profit</Option> */}
      </Select>
      <Button onClick={handleClick}>Search</Button>
    </Container>
  );
};

export default Input;
