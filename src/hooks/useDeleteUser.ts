import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usersQueries, QUERY_KEYS, IUserDto } from "../queries/users";
import { IPagination } from "../types";

export const useDeleteUserFromPage = (page: number) => {
  const queryClient = useQueryClient();

  const userDeleteMuatation = useMutation({
    mutationFn: usersQueries.deleteUser,
    onSettled: async () =>
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.users],
      }),
    onSuccess: async (_, deleteId) => {
      const userData = queryClient.getQueryData<IPagination<IUserDto>>([
        QUERY_KEYS.users,
        page,
      ]);

      if (userData?.data) {
        const newData = userData.data.filter((user) => user.id !== deleteId);

        queryClient.setQueryData(
          [QUERY_KEYS.users, page],
          (oldData: IPagination<IUserDto>) => {
            return {
              ...oldData,
              data: newData,
            };
          }
        );
      }
    },
  });

  return {
    onDelete: userDeleteMuatation.mutate,
    isPending: userDeleteMuatation.isPending,
    getCurrentUserPendingState: (id: string) =>
      userDeleteMuatation.isPending && userDeleteMuatation.variables === id,
  };
};
