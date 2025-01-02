import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useApi } from "../hooks/useApi"
import { GameEntity, PlayerEntity } from "../types";

export const useDeleteTeamMutation = () => {
    const {apiDelete, apiPut, apiGet} = useApi();
    const queryClient = useQueryClient()
    
    const { mutate, isPending, error} = useMutation({
        mutationKey: ['teams'],
        mutationFn: async(id: string) => {
            const games: GameEntity[] = await apiGet('games')
            const isTeamInGames = games.some((game) => game.idTeam1 === id || game.idTeam2 === id)

            if(isTeamInGames) {
                throw new Error('Cannot delete a team which has playes any games')
            }

            const players: PlayerEntity[] = await apiGet('players');
            const updatePlayersAfterDeleteTeam = players
            .filter((player: PlayerEntity) => player.teamId === id)
            .map((player: PlayerEntity) => apiPut(`players/${player.id}`, { teamId: ""}));
            await Promise.all(updatePlayersAfterDeleteTeam)



            return apiDelete(`teams/${id}`)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['teams'] });
            queryClient.invalidateQueries({ queryKey: ['players'] });
            queryClient.invalidateQueries({queryKey: ['games']})
        }
    })

    return {
        isPending,
        error,
        mutate
    }
}