import { useQuery } from "@tanstack/react-query";
import { useApi } from "../hooks/useApi"
import { TeamsEntity } from "../types";

export const useGetTeamsQuery = () => {
    const {apiGet} = useApi();
    const { data } = useQuery<TeamsEntity[]>({
        queryKey: ['teams'],
        queryFn: async () => {
            return apiGet<TeamsEntity[]>('teams')
        }
    }) 
    return {
        data
    }
}