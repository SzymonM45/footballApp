import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useApi } from "../hooks/useApi"
import { PlayerEntity } from "../types";

export const useDeleteTeamMutation = () => {
    const {apiDelete, apiPut, apiGet} = useApi();
    const queryClient = useQueryClient()
    
    const { mutate, isPending, error} = useMutation({
        mutationKey: ['teams'],
        mutationFn: async(id: string) => {
            const players: PlayerEntity[] = await apiGet('players');
            const updatePlayersAfterDeleteTeam = players
            .filter((player: PlayerEntity) => player.teamId === id)
            .map((player: PlayerEntity) => apiPut(`players/${player.id}`, { teamId: ""}));
            await Promise.all(updatePlayersAfterDeleteTeam)



            return apiDelete(`teams/${id}`)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['teams'] });
            queryClient.invalidateQueries({ queryKey: ['players'] })
        }
    })

    return {
        isPending,
        error,
        mutate
    }
}