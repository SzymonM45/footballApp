import { useQuery } from "@tanstack/react-query"
import { GameEntity } from "../types"
import { useApi } from "../hooks/useApi"

export const useGetGamesQuery = () => {
    const { apiGet} = useApi()

    const { data, isLoading, isError, error } = useQuery<GameEntity[]>({
        queryKey: ['games'],
        queryFn: async () => {
            // const response = await fetch('http://localhost:3000/games');
            // return response.json();
            return apiGet<GameEntity[]>('games')
        }
    })
    return {
        data,
        isError,
        isLoading,
        error
    }
}