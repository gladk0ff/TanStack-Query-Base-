import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usersQueries, QUERY_KEYS } from "../../queries/users";

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  const userDeleteMuatation = useMutation({
    // mutationKey не обязателене если вы не хотите узнать статус мутации из другого компонента
    mutationFn: usersQueries.deleteUser,
    onSuccess: async (_, deleteId) => {
      queryClient.getQueriesData([QUERY_KEYS.users]);
    },
    onSettled: async () =>
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.users],
      }),
  });

  return {
    onDelete: userDeleteMuatation.mutate,
    isPending: userDeleteMuatation.isPending,
  };
};
