import { TeamsEntity } from "./types"

type SingleTeamProps = {
    team: TeamsEntity;
}

export const SingleTeam = ({team}: SingleTeamProps) => {
    return(
        <>
        <li>
            <h2><strong>{team.name}</strong></h2>
            <h3><strong>{team.yearofcreation}</strong></h3>
            <p>{team.city}</p>
        </li>
        </>
    )
}