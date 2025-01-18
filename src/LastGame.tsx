import { GameEntity, TeamsEntity } from "./types";

type LastGameProps = {
    lastGame: GameEntity;
    teams: TeamsEntity[];
}

export const LastGame = ({ lastGame, teams}: LastGameProps) => {
const team1 = teams.find((team: TeamsEntity) => team.id === lastGame.idTeam1)?.name || 'Unknown team 1';

const team2 = teams.find((team: TeamsEntity) => team.id === lastGame.idTeam2)?.name || 'Unknown team 2';


return(
    <>
    <h3>Last Game</h3>
        <p><strong>Title: </strong>{lastGame.title}</p>
        <p><strong>Date: </strong>{lastGame.matchdate}</p>
        <p><strong>Place: </strong>{lastGame.place}</p>
        <p><strong>Duration: </strong>{lastGame.duration}</p>
        <p><strong>Teams: </strong>{team1} vs {team2}</p>
        <p><strong>Score: </strong>{lastGame.goalsTeam1} - {lastGame.goalsTeam2}</p>
    </> 
)
};