import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useApi } from "../hooks/useApi"
import { PlayerDto, PlayerEntity } from "../types"

export const useUpdatePlayerMutation = (id: string) => {
    const {apiPut} = useApi()
    const queryClient = useQueryClient()

    const {mutate, isPending, error} = useMutation({
        mutationKey: ['players'],
        mutationFn: async(payload: PlayerDto) => {
            return apiPut<PlayerEntity, PlayerDto>(`players/${id}`,payload)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['players']
            })
        }
    })
    return {
        isPending,
        error,
        mutate
    }
}