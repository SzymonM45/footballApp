import { useDeletePlayerMutation } from "./queries/useDeletePlayerMutation"

type DeletePlayerConfirmationProps = {
    id: string
    idTeam: string
    showDelete(): void
}
export const DeletePlayerConfirmation = ({id,showDelete, idTeam}: DeletePlayerConfirmationProps) => {
    const {isPending, error, mutate: deletePlayer} = useDeletePlayerMutation(id)

    if(isPending) return <p>Loading...</p>
    if(error) return <p>{error.message}</p>

    const handleDelete = () => {
        deletePlayer()
    }

    const handleCancle = () => {
        showDelete()
    }

    if (idTeam !== '') return <h2>You cannot remove a player who is currently on the team</h2>

    return (
        <div>
            <p>Do you want to remove players?</p>
            <button onClick={handleDelete}>Yes</button>
            <button onClick={handleCancle}>Cancle</button>
        </div>
    )
        
    

    
}