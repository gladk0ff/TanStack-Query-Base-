import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usersQueries, QUERY_KEYS } from "../../queries/users";

export const useDeleteUser = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    // mutationKey не обязателене если вы не хотите узнать статус мутации из другого компонента
    mutationFn: () => usersQueries.deleteUser(id),
    onSuccess: async () =>
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.users],
      }),
    onError: (error) => {
      // Обработка ошибки в мутации
      console.log("Mutation error:", error);
    },
    onSettled: async () => {
      console.log("onSettled");
    },
  });
};
