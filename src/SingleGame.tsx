
import { GameEntity, TeamsEntity } from "./types"

type SingleGameProps = {
    game: GameEntity;
    teams:TeamsEntity[];
}
export const SingleGame = ({game, teams} : SingleGameProps) => {

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
        
    </li>

    )

}