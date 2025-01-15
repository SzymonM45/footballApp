import { ChangeEvent, FormEvent, useState } from "react";
import { useUpdateGameMutation } from "./queries/useUpdateGameMutation";
import { GameEntity, TeamsEntity } from "./types";

type EditGameProps = {
  game: GameEntity;
  teams: TeamsEntity[];
  onSave: (updatedGame: GameEntity) => void;
  onCancel: () => void
};

export const EditGame = ({ game, teams, onSave, onCancel}: EditGameProps) => {
  const { isPending, error, mutate: updateGame } = useUpdateGameMutation();

  const [values, setValues] = useState({
    title: game.title,
    matchdate: game.matchdate,
    place: game.place,
    duration: game.duration,
    idTeam1: game.idTeam1,
    idTeam2: game.idTeam2,
    goalsTeam1: game.goalsTeam1,
    goalsTeam2: game.goalsTeam2,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleCancle = () => {
    onCancel(); // Przełącza tryb edycji
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Form submitted, preventDefault called.");

    const updatedGame = {
      ...game,
    title: values.title,
    matchdate: values.matchdate,
    place: values.place,
    duration: values.duration,
    idTeam1: values.idTeam1,
    idTeam2: values.idTeam2,
    goalsTeam1: Number(values.goalsTeam1),
    goalsTeam2: Number(values.goalsTeam2),
    }
    
    updateGame({
      id: game.id,
      payload: updatedGame,
    });
    onSave(updatedGame)
  };

  if (isPending) return <p>Saving...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={values.title}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="matchdate">Date</label>
        <input
          type="date"
          name="matchdate"
          id="matchdate"
          value={values.matchdate}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="place">Place</label>
        <input
          type="text"
          name="place"
          id="place"
          value={values.place}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="duration">Duration</label>
        <input
          type="text"
          name="duration"
          id="duration"
          value={values.duration}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="idTeam1">Team 1</label>
        <select
          name="idTeam1"
          id="idTeam1"
          value={values.idTeam1}
          onChange={handleChange}
        >
          {teams.map((team) => (
            <option key={team.id} value={team.id}>
              {team.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="idTeam2">Team 2</label>
        <select
          name="idTeam2"
          id="idTeam2"
          value={values.idTeam2}
          onChange={handleChange}
        >
          {teams.map((team) => (
            <option key={team.id} value={team.id}>
              {team.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="goalsTeam1">Goals Team 1</label>
        <input
          type="number"
          name="goalsTeam1"
          id="goalsTeam1"
          value={values.goalsTeam1}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="goalsTeam2">Goals Team 2</label>
        <input
          type="number"
          name="goalsTeam2"
          id="goalsTeam2"
          value={values.goalsTeam2}
          onChange={handleChange}
        />
      </div>
      <button type="submit" disabled={isPending}>
        Save
      </button>
      <button type="button" onClick={handleCancle} disabled={isPending}>
        Cancel
      </button>
    </form>
  );
};