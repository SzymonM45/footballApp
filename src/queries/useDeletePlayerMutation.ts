import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useApi } from "../hooks/useApi"

export const useDeletePlayerMutation = (id: string) => {
    const {apiDelete} = useApi()
    const queryClient = useQueryClient()

    const {mutate, isPending, error} = useMutation({
        mutationKey: ['players'],
        mutationFn: async() => {
            return apiDelete(`players/${id}`)
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