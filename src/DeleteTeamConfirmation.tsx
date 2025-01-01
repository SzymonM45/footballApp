import { useDeleteTeamMutation } from "./queries/useDeleteTeamMutation"

type DeleteTeamConfirmationProps = {
    id: string,
    showDelete(): void
}

export const DeleteTeamConfirmation = ({id, showDelete}: DeleteTeamConfirmationProps) => {
    const { isPending, error, mutate: deleteTeam} = useDeleteTeamMutation()

    if(isPending) return <p>Loading...</p>
    if(error) return <p>{error.message}</p>

    const handleDelete = () => {
        deleteTeam(id)
    }
    const handleCancel = () => {
        showDelete()
    }
 

return (
    <div>
        <p> Do you really want to remove team?</p>
        <button onClick={handleDelete}>Yes</button>
        <button onClick={handleCancel}>Cancel</button>
    </div>
)

}