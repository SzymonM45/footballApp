import { AddPlayer } from "./AddPlayer";
import { useGetPlayersQuery } from "./queries/useGetPlayersQuery"
import { useGetTeamsQuery } from "./queries/useGetTeamsQuery";
import { SinglePlayer } from "./SinglePlayer"

export const Players = () => {
    const { data: players } = useGetPlayersQuery();
    const { data: teams } = useGetTeamsQuery();
    if(!players || !teams) return <p>Loading...</p>;
    const teamMap = teams.reduce((map, team) => {
        map[team.id] = team.name;
        return map;
    }, {} as Record<string,string>);
    return(
        <>
        <h2>Players</h2>
        <AddPlayer/>
        <ul>
            {players.map(player => {
                const teamName = teamMap[player.teamId] || 'Free';
                return <SinglePlayer player={{...player, teamName}} key={player.id}/>;
                })}
        </ul>

        </>
    )}
