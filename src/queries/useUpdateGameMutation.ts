import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApi } from "../hooks/useApi";
import { GameDto, GameEntity } from "../types";

export const useUpdateGameMutation = () => {
  const { apiPut } = useApi();
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationKey: ['games'], // Klucz dla zapytania związanego z grami
    mutationFn: async ({ id, payload }: { id: string; payload: GameDto }) => {
      // Wywołanie funkcji PUT z odpowiednią ścieżką
      return apiPut<GameEntity, GameDto>(`games/${id}`, payload);
    },
    onSuccess: () => {
      // Odświeżenie zapytania 'games' po powodzeniu mutacji
      queryClient.invalidateQueries({
        queryKey: ['games'],
      });
    },
  });

  return {
    isPending, // Stan oczekiwania na wykonanie mutacji
    error, // Błąd, jeśli wystąpił
    mutate, // Funkcja mutująca
  };
};