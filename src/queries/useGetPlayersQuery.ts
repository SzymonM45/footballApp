import { useQuery } from "@tanstack/react-query"

export const useGetPlayersQuery = () => {
    const { data } = useQuery({
        queryKey: ['players'],
        queryFn: async () => {
            const response = await fetch('http://localhost:3000/players');
            return response.json();
        }
    })
    return {
        data
    }
}