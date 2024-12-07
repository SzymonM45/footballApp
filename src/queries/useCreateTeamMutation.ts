import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useApi } from "../hooks/useApi"
import { TeamsDto, TeamsEntity } from "../types";

export const useCreateTeamMutation = () => {
    const queryClient = useQueryClient()
    const { apiPost } = useApi();
    const { mutate, isPending } = useMutation({
        mutationKey: ['teams', 'create'],
        mutationFn: async(payload: TeamsDto) => {
            return apiPost<TeamsEntity, TeamsDto>('teams', payload)
        }, 
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['teams']
            })
        }
    })
    return {
        mutate, 
        isPending
    }
}