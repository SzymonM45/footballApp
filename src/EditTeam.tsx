import { ChangeEvent, FormEvent, useState } from "react"
import { useUpdateTeamMutation } from "./queries/useUptadeTeamMutation"
import { TeamsEntity } from "./types"
import { useGetPlayersQuery } from "./queries/useGetPlayersQuery";
import { useUpdatePlayerMutation } from "./queries/useUpdatePlayerMutation";


type EditTeamProps = {
    team: TeamsEntity;
    showEdit(): void;
};
export const EditTeam = ({team, showEdit }: EditTeamProps) => {
    const {isPending: isTeamUpdating, error: teamError, mutate: editTeam} = useUpdateTeamMutation();
    const { data: players} = useGetPlayersQuery();
    const { mutate: updatePlayer} = useUpdatePlayerMutation();


    const [values, setValues]= useState({
        name: team.name,
        yearofcreation: team.yearofcreation,
        city: team.city,
    });

   
    if(!players) return <p>Loading players...</p>;

    const teamPlayers = players.filter((player) => player.teamId === team.id);

    
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value} = e.target;
        setValues(prevValues => ({
            ...prevValues, 
            [name]: value,
        }));
    }
    const handleCancel = () => {
        showEdit();
    }
    const handleSubmit = (e: FormEvent)=> {
        e.preventDefault()

        editTeam({
            id: team.id,
            payload: {
                name: values.name,
                yearofcreation: values.yearofcreation,
                city: values.city,
            }
        })
    }


    const handleRemovePlayer = (playerId: string) => {
        const player = players.find((p)=> p.id === playerId);
        if(player) {
        updatePlayer({
            id: playerId,
            payload: {
                teamId: '',
                name: player.name,
                lastname: player.lastname,
            },
        })
    }
}



    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Name</label>
                <input type='text' name='name' id='name' value={values.name} onChange={handleChange}/>
            </div>
            <div>
            <label htmlFor="yearofcreation">Yearofcreation</label>
            <input type='text' name='yearofcreation' id='yearofcreation' value={values.yearofcreation} onChange={handleChange}/>
            </div>
            <div>
            <label htmlFor="city">City</label>
            <input type='text' name='city' id='city' value={values.city} onChange={handleChange}/>
            </div>
        <button type='submit' disabled={isTeamUpdating}>Edit Player</button>
        <button onClick={handleCancel} disabled={isTeamUpdating}>Cancel</button>

        <h4>Team players</h4>
        <ul>
            {teamPlayers.map((player) => (
                <li key={player.id}>
                    {player.name} {player.lastname}
                    <button onClick={() => handleRemovePlayer(player.id)}>
                        Remove player
                    </button>
                </li>
            ))}
        </ul>
        


        </form>
    )
}