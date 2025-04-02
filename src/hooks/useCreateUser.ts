import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usersQueries, QUERY_KEYS } from "../queries/users";

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: usersQueries.createUser,
    // onSuccess: () =>
    //   queryClient.invalidateQueries({
    //     queryKey: [QUERY_KEYS.users],
    //   }),
    onError: (error) => {
      // Обработка ошибки в мутации
      console.log("Mutation error:", error);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.users],
      });
    },
  });
};
