import { AddTeam } from "./AddTeam";
import { useGetTeamsQuery } from "./queries/useGetTeamsQuery"
import { SingleTeam } from "./SingleTeam";

export const Teams = () => {

    const { data, isFetching} = useGetTeamsQuery();
    if(isFetching) return <p>Loading...</p>
    if(!data) return <p>No data...</p>
    return(
        <>
        <h1>Teams</h1>
        <AddTeam/>
        <ul>
            {data?.map(team => <SingleTeam team={team} key={team.id}/>)}
        </ul>
        </>
    )
}