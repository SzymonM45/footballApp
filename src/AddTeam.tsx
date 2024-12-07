import { ChangeEvent, FormEvent, useState } from "react";
import { useCreateTeamMutation } from "./queries/useCreateTeamMutation"

export const AddTeam = () => {
    const { mutate, isPending } = useCreateTeamMutation();
    const [values, setValues] = useState({
        name: '',
        yearofcreation: '',
        city: ''
    })
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValues(prevValues => ({
            ...prevValues, [name]: value
        }))
    }

    const handleSubmit = (e: FormEvent)=> {
        e.preventDefault();
        if(!values.name.trim()) {
            alert(`Name of team is required`)
        }
        mutate({
            name: values.name,
            yearofcreation: values.yearofcreation,
            city: values.city
        })
        setValues({
            name: '',
            yearofcreation: '',
            city: ''
        })
    }

    return(
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Name</label>
                <input type='text' name='name' id='name' value={values.name} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="yearofcreation">Year of creation</label>
                <input type='text' name='yearofcreation' id='yearofcreation' value={values.yearofcreation} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="city">City</label>
                <input type='text' name='city' id='city' value={values.city} onChange={handleChange}/>
            </div>
            <button type='submit' disabled={isPending}>Add Team</button>
        </form>
    )
}