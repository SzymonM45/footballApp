import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useApi } from "../hooks/useApi"

export const useDeleteTeamMutation = () => {
    const {apiDelete} = useApi();
    const queryClient = useQueryClient()
    
    const { mutate, isPending, error} = useMutation({
        mutationKey: ['teams'],
        mutationFn: async(id: string) => {
            return apiDelete(`teams/${id}`)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['teams']
            })
        }
    })

    return {
        isPending,
        error,
        mutate
    }
}