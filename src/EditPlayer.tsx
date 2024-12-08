import { ChangeEvent, FormEvent, useState } from "react"
import { useUpdatePlayerMutation } from "./queries/useUpdatePlayerMutation"
import { PlayerEntity } from "./types"

type EditPlayerProps = {
    player: PlayerEntity
    showEdit(): void
}

export const EditPlayer = ({player, showEdit}: EditPlayerProps) => {
    const {isPending, error, mutate: EditPlayer} = useUpdatePlayerMutation()

    const [values, setValues] = useState({
        name: player.name,
        lastname: player.lastname,
        teamId: player.teamId,
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValues(prevValues =>  ({
            ...prevValues, [name]: value
        }))
    }

    const handleCancle = () => {
        showEdit()
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()

        EditPlayer({
            id: player.id,
            payload: {
            name: values.name,
            lastname: values.lastname,
            teamId: values.teamId
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
            <label htmlFor="lastname">LastName</label>
            <input type='text' name='lastname' id='lastname' value={values.lastname} onChange={handleChange}/>
        </div>
        <button type='submit' disabled={isPending}>Edit Player</button>
        <button onClick={handleCancle} disabled={isPending}>Cancle</button>
    </form>
    )

}