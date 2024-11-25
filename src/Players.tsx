import { useGetPlayersQuery } from "./queries/useGetPlayersQuery"
import { SinglePlayer } from "./SinglePlayer"

export const Players = () => {
    const { data } = useGetPlayersQuery()
    if(!data) return <p>Loading...</p>
    return(
        <>
        <h2>Players</h2>
        <ul>
            {data?.map(player => <SinglePlayer player={player} key={player.id}/>)}
        </ul>

        </>
    )
}