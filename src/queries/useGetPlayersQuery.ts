import { useQuery } from "@tanstack/react-query"
import { useApi } from "../hooks/useApi";
import { PlayerEntity } from "../types";

export const useGetPlayersQuery = () => {
    const {apiGet} = useApi();
    const { data } = useQuery<PlayerEntity[]>({
        queryKey: ['players'],
        queryFn: async () => {
            // const response = await fetch('http://localhost:3000/players');
            // return response.json();
            return apiGet<PlayerEntity[]>('players')
        }
    })
    return {
        data
    }
}