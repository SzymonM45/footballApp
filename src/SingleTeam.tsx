import { useState } from "react";
import { useGetPlayersQuery } from "./queries/useGetPlayersQuery";
import { useUpdatePlayerMutation } from "./queries/useUpdatePlayerMutation";
import { TeamsEntity } from "./types"

import { EditTeam } from "./EditTeam";
import { DeleteTeamConfirmation } from "./DeleteTeamConfirmation";
// import { useDeleteTeamMutation } from "./queries/useDeleteTeamMutation";

type SingleTeamProps = {
    team: TeamsEntity;
}

export const SingleTeam = ({team}: SingleTeamProps) => {
    const { data: players } = useGetPlayersQuery();
    const { mutate } = useUpdatePlayerMutation();
       
    const [isAddingPlayer, setIsAddingPlayer] = useState(false);
    const [isEditingTeam, setIsEditingTeam] = useState(false);
    const [isDeletingTeam, setIsDeletingTeam] = useState(false);
    const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);  
    

    if(!players) return <p>Loading players...</p>;

    const unassignedPlayers = players.filter(player => player.teamId ==="");

    const handleAddPlayertoTeamClick = () => {
        setIsAddingPlayer(!isAddingPlayer);
    }

    const handleEditTeamClick = () => {
        setIsEditingTeam(true);
    };

    const handleDeleteTeamClick = () => {
        setIsDeletingTeam(!isDeletingTeam)
    }

    const closeEditTeam = () => {
        setIsEditingTeam(false);
    };

    const handlePlayerSelect = (playerId: string) => {
        setSelectedPlayerId(playerId);
             
    }

    const handleConfirmAddingPlayer = () => {
        if(selectedPlayerId){
            const selectedPlayer = players.find(player=> player.id === selectedPlayerId)

           if(selectedPlayer) {
            mutate({
                id: selectedPlayerId,
                payload: {
                name: selectedPlayer.name,
                lastname: selectedPlayer.lastname,
                teamId: team.id}
            });
            setIsAddingPlayer(false);
            setSelectedPlayerId(null);
        }
    }
};

    return(
        <>
        <li>
            <h2><strong>{team.name}</strong></h2>
            <h3><strong>{team.yearofcreation}</strong></h3>
            <p>{team.city}</p>
            <button onClick={handleDeleteTeamClick}> Delete Team       </button>
            {isDeletingTeam && (
                <DeleteTeamConfirmation id={team.id} showDelete={handleDeleteTeamClick}/>
            )}
            <button onClick={handleEditTeamClick}>Edit Team</button>
            {isEditingTeam && <EditTeam team={team} showEdit={closeEditTeam}/>}
            <button onClick={handleAddPlayertoTeamClick}>{isAddingPlayer ? 'Cancel' : 'Add Player to this team'}</button>
            {isAddingPlayer && (
                <div>
                    <h4>Select a Player</h4>
                    <select onChange={(e)=> handlePlayerSelect(e.target.value)} defaultValue=''>
                        <option value='' disabled>
                            Select a player
                        </option>
                        {unassignedPlayers.map(player=> (
                            <option key={player.id} value={player.id}>{player.name} {player.lastname}</option>
                        ))}

                    </select>
                    <button onClick={handleConfirmAddingPlayer} disabled={!selectedPlayerId}>Confirm</button>
                </div>
            )}
        </li>
        </>
    )
}