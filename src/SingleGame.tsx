
import { useState } from "react";
import { GameEntity, TeamsEntity } from "./types"
import { useUpdateGameMutation } from "./queries/useUpdateGameMutation";
import { EditGame } from "./EditGame";

type SingleGameProps = {
    game: GameEntity;
    teams:TeamsEntity[];
    onUpdate?: (updatedGame: GameEntity) => void
}
export const SingleGame = ({game, teams} : SingleGameProps) => {
    const [isEditing, setIsEditing] = useState(false)
    const { mutate: updateGame, isPending, error} = useUpdateGameMutation();

    const handleSave = (updatedGame: GameEntity) => {
        updateGame({
            id: game.id,
            payload: {
                title: updatedGame.title,
                matchdate: updatedGame.matchdate,
                place: updatedGame.place,
                duration: updatedGame.duration,
                idTeam1: updatedGame.idTeam1,
                idTeam2: updatedGame.idTeam2,
                goalsTeam1: updatedGame.goalsTeam1,
                goalsTeam2: updatedGame.goalsTeam2,
            }
        })
        setIsEditing(false)
    }

    if(isEditing) {
        return<EditGame game={game} teams={teams} onSave={handleSave} onCancel={()=>setIsEditing(false)}/>
    }

    console.log("SingleGame Rendered");
    console.log("Game passed to SingleGame:", game);
    console.log("Teams passed to SingleGame:", teams);  
    
    
    const team1 = teams.find((team) => team.id === game.idTeam1)?.name 
    const team2 = teams.find((team) => team.id === game.idTeam2)?.name 

console.log(`Found teams for game ${game.id}:`, { team1, team2 });

    const titleWithTeams = `${game.title}: ${team1} - ${team2}`

    console.log('Game:', game);
    console.log('Teams:', teams);
    return (
        <li key={game.id}>
        <h3>{titleWithTeams}</h3>
        <p>Date: {game.matchdate}</p>
        <p>Place: {game.place}</p>
        <p>Duration: {game.duration}</p>
        <p>Teams: {team1} vs {team2}</p>
        <p>Score: {game.goalsTeam1} - {game.goalsTeam2}</p>
        <button onClick={()=> setIsEditing(true)} disabled={isPending}>Edit</button>
        {error && <p>{error.message}</p>}
    </li>

    )

}