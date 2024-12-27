import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApi } from "../hooks/useApi"
import { TeamsDto, TeamsEntity } from "../types";

export const useUpdateTeamMutation = ()=> {
    const {apiPut} = useApi();
    const queryClient = useQueryClient();
    const {mutate, isPending, error} = useMutation({
        mutationKey: ['teams'],
        mutationFn: async({id, payload}:{id: string; payload: TeamsDto}) => {
            return apiPut<TeamsEntity, TeamsDto>(`teams/${id}`, payload)
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