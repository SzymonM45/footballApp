import { AddGame } from "./AddGame";
import { useGetGamesQuery } from "./queries/useGetGamesQuery";
import { useGetTeamsQuery } from "./queries/useGetTeamsQuery";
import { SingleGame } from "./SingleGame";

export const Games = () => {
const { data: games, isLoading: isGamesLoading, error: gamesError} = useGetGamesQuery()
const {data: teams, isFetching: isTeamsLoading, error: teamsError} = useGetTeamsQuery()

if(isGamesLoading || isTeamsLoading)  return <p> Loading...</p>
if(gamesError || teamsError)  return <p>Error: {gamesError?.message || teamsError?.message} || 'Something went wrong'</p>
const sortedGames = games?.slice().sort((a,b) => new Date(a.matchdate).getTime() - new Date(b.matchdate).getTime()) 

return(
    <>
    <h2>Games</h2>
    <AddGame/>
    <ul>
        {sortedGames?.map((game) => (
            <SingleGame  key={game.id} game={game} teams={teams}/>
            ))}
    </ul>
    
    </>
)


}