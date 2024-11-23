import { useGetPlayersQuery } from "./queries/useGetPlayersQuery"

export const Players = () => {
    const { data } = useGetPlayersQuery()
    if(!data) return <p>Loading...</p>
    return(
        <>
        <h2>Players</h2>
        <ul>
            {data?.map(player => <li key={player.id}>{player.name}{player.lastname}</li>)}
        </ul>

        </>
    )
}