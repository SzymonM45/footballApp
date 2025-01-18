import { LastGame } from "./LastGame";
import { useGetGamesQuery } from "./queries/useGetGamesQuery";
import { useGetTeamsQuery } from "./queries/useGetTeamsQuery";


export const Statistics = () => {
    const {data: games, isLoading: isGamesLoading, error: gamesError} = useGetGamesQuery();
    const { data: teams, isFetching: isTeamsLoading, error: teamsError} = useGetTeamsQuery()

    if(isGamesLoading || isTeamsLoading) return <p>Loading...</p>
    if(gamesError || teamsError) return <p>Error loading: {gamesError?.message || teamsError?.message} || 'Somethnig went wrong</p>

    if(!games || games.length === 0) return<p>No games available</p>
    if(!teams || teams.length === 0) return <p>No teams available</p>

    const lastGame = games.sort((a,b)  => new Date(b.matchdate).getTime() - new Date(a.matchdate).getTime())[0]

  




    return(
        <>
        <h2>Statistics</h2>
        <LastGame lastGame={lastGame} teams={teams}/>
        </>
    )
}