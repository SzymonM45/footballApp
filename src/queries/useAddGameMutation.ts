import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useApi } from "../hooks/useApi";
import { GameDto } from "../types";


export const useAddGameMutation = () => {
    const queryClient = useQueryClient();
    const { apiPost } = useApi();
    const { mutate, isPending, error } = useMutation({
        mutationKey: ['games', 'create'],
        mutationFn: async(game: GameDto) => {
            return apiPost ('games', game)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['games']
            })
        }


    })

    return {
        mutate, 
        isPending,
        error
    }
}