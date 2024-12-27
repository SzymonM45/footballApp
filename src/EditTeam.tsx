import { ChangeEvent, FormEvent, useState } from "react"
import { useUpdateTeamMutation } from "./queries/useUptadeTeamMutation"
import { TeamsEntity } from "./types"

type EditTeamProps = {
    team: TeamsEntity;
    showEdit(): void;
};
export const EditTeam = ({team, showEdit }: EditTeamProps) => {
    const {isPending, error, mutate: editTeam} = useUpdateTeamMutation()

    const [values, setValues]= useState({
        name: team.name,
        yearofcreation: team.yearofcreation,
        city: team.city,
    });

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

    if(isPending) return <p>Loading...</p>
    if(error) return <p>{error.message}</p>

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
        <button type='submit' disabled={isPending}>Edit Player</button>
        <button onClick={handleCancel} disabled={isPending}>Cancel</button>


        </form>
    )
}