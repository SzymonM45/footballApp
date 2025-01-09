import { AddGame } from "./AddGame";
import { useGetGamesQuery } from "./queries/useGetGamesQuery";
import { useGetTeamsQuery } from "./queries/useGetTeamsQuery";
import { SingleGame } from "./SingleGame";

export const Games = () => {
const { data: games, isLoading: isGamesLoading, error: gamesError} = useGetGamesQuery()
const {data: teams, isFetching: isTeamsLoading, error: teamsError} = useGetTeamsQuery()
console.log("Games Component Rendered");
console.log("Games data:", games);
console.log("Teams data:", teams);

if(isGamesLoading || isTeamsLoading) {
console.log("Loading state active..."); 
return <p> Loading...</p>
}

if(gamesError || teamsError)  {
    console.error("Error occurred:", gamesError, teamsError);
    return <p>Error: {gamesError?.message || teamsError?.message} || 'Something went wrong'</p>
}

console.log("Sorting games...");
const sortedGames = games
?.slice()
.sort((a,b) => new Date(a.matchdate).getTime() - new Date(b.matchdate).getTime()) 

console.log("Sorted Games:", sortedGames);
return(
    <>
    <h2>Games</h2>
    <AddGame teams={teams}/>
    <ul>
        {sortedGames?.map((game) => (
         teams ?   <SingleGame  key={game.id} game={game} teams={teams}/> : null
            ))}
    </ul>
    
    </>
)


}