import React, { useMemo, useState } from "react";
import { TeamsEntity } from "./types";
import { useAddGameMutation } from "./queries/useAddGameMutation";

interface AddGameProps {
  teams: TeamsEntity[];
}

export const AddGame = ({ teams = []}: AddGameProps) => {
  const [gameDate, setgameDate] = useState({
    title: "",
    matchdate: "",
    place: "",
    duration: "",
    idTeam1: "",
    idTeam2: "",
    goalsTeam1: 0,
    goalsTeam2: 0,
  });

  const { mutate, isPending, error } = useAddGameMutation();

  // Użycie useMemo dla opcji drużyn
  const teamOptions = useMemo(() => {
    console.log("Transforming teams into options...");
    return teams.map((team) => ({
      value: team.id,
      label: team.name,
    }));
  }, [teams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setgameDate((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (gameDate.idTeam1 === gameDate.idTeam2) {
      alert("Teams must be different.");
      return;
    }
    mutate(gameDate); // Wywołanie mutacji
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Game</h3>

  
      <input
        type="text"
        name="title"
        value={gameDate.title}
        onChange={handleChange}
        placeholder="Enter title"
        required
      />

    
      <input
        type="date"
        name="matchdate"
        value={gameDate.matchdate}
        onChange={handleChange}
        required
      />

   
      <input
        type="text"
        name="place"
        value={gameDate.place}
        onChange={handleChange}
        placeholder="Enter place"
        required
      />

 
      <input
        type="text"
        name="duration"
        value={gameDate.duration}
        onChange={handleChange}
        placeholder="Enter duration"
        required
      />

      <select
        name="idTeam1"
        value={gameDate.idTeam1}
        onChange={handleChange}
        required
      >
        <option value="">Select Team 1</option>
        {teamOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

    
      <select
        name="idTeam2"
        value={gameDate.idTeam2}
        onChange={handleChange}
        required
      >
        <option value="">Select Team 2</option>
        {teamOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

     
      <input
        type="number"
        name="goalsTeam1"
        value={gameDate.goalsTeam1}
        onChange={handleChange}
        placeholder="Goals Team 1"
        required
      />
      <input
        type="number"
        name="goalsTeam2"
        value={gameDate.goalsTeam2}
        onChange={handleChange}
        placeholder="Goals Team 2"
        required
      />

      <button type="submit" disabled={isPending}>
        {isPending ? "Adding..." : "Add Game"}
      </button>

      {error && <p>Error: {error.message}</p>}
    </form>
  );
};