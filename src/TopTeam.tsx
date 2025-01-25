import { GameEntity, TeamsEntity } from "./types"

type TopTeamsProps = {
    games: GameEntity[];
    teams: TeamsEntity[];
}
 export const TopTeams = ({games, teams}: TopTeamsProps) => {
    const teamGoals: {[teamId: number]: number} ={}

    games.forEach((game) => {

        const team1Id = Number(game.idTeam1);
        const team2Id = Number(game.idTeam2);

        if(!isNaN(team1Id)) {
            teamGoals[team1Id] = (teamGoals[team1Id] || 0) + Number(game.goalsTeam1);
        }
        if(!isNaN(team2Id)) {
            teamGoals[team2Id] = (teamGoals[team2Id] || 0) + Number(game.goalsTeam2);
        }
              
    });
    const teamStats = teams.map((team) => ({
        name: team.name,
        goals: teamGoals[Number(team.id)] || 0,
    }));

    const topTeams = teamStats
    .sort((a,b) => b.goals - a.goals)
    .slice(0,3);

    return(
        <div>
            <h3>Top 3 Teams by Goals</h3>
            <ul>
                {topTeams.map((team, index) => (
                    <li key={index}>
                        <strong>{team.name}</strong>: {team.goals} goals
                    </li>
                ))}
            </ul>
        </div>
    )
 }