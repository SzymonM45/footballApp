import { ChangeEvent, FormEvent, useState } from "react";
import { useCreatePlayerMutation } from "./queries/useCreatePlayerMutation"


export const AddPlayer = () => {
    const { mutate, isPending} = useCreatePlayerMutation();
    const [values, setValues] = useState({
        name: '',
        lastname: '',
        teamId: '',
    })
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValues(prevValues =>  ({
            ...prevValues, [name]: value
        }))
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if(!values.name.trim()) {
            alert(`Name is required`);
            return;
        }
        if(!values.lastname.trim()) {
            alert(`Lastname is required`);
            return;
        }
       
        mutate({
            name: values.name,
            lastname: values.lastname,
            teamId: values.teamId
        })
        setValues({
            name: '',
            lastname: '',
            teamId: ''
        })
    }
  return (
    <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="name">Name</label>
            <input type='text' name='name' id='name' value={values.name} onChange={handleChange}/>
        </div>
        <div>
            <label htmlFor="lastname">LastName</label>
            <input type='text' name='lastname' id='lastname' value={values.lastname} onChange={handleChange}/>
        </div>
        <button type='submit' disabled={isPending}>Add Player</button>
    </form>
  )
}