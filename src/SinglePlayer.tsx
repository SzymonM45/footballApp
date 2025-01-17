import { useState } from "react"
import { DeletePlayerConfirmation } from "./DeletePlayerConfirmation"
import { PlayerEntity} from "./types"
import { EditPlayer } from "./EditPlayer"

type SinglePlayerProps =  {
    player: PlayerEntity
}

export const SinglePlayer = ({player}: SinglePlayerProps) => {
    const [isDeleted, setIsDeleted] = useState(false)
    const [isEdited, setIsEditted] = useState(false)

    const handleDeleted = () => {
        setIsDeleted(!isDeleted)
    }

    const handleEdit = () => {
        setIsEditted(!isEdited)

    }

    const {id, name, lastname, teamName, teamId} = player

    return(
        <>
        <li>
            <h2><strong>{name} {lastname}  - {teamName || "Free" }</strong></h2>
            <p>
                <button onClick={handleDeleted}>Delete</button>
                <button onClick={handleEdit}>Edit</button>
            </p>
            {isDeleted ? <DeletePlayerConfirmation id={id} showDelete={handleDeleted} idTeam={teamId}/> : null}
            {isEdited ? <EditPlayer player={player} showEdit={handleEdit} /> : null}
        </li>
        </>
    )
}