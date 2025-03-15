import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usersQueries, QUERY_KEYS, IUserDto } from "../../queries/users";
import { IPagination } from "../../types";

export const useDeleteUserFromPage = (page: number) => {
  const queryClient = useQueryClient();

  const userDeleteMuatation = useMutation({
    mutationFn: usersQueries.deleteUser,
    onSuccess: async (_, deleteId) => {
      const userData = queryClient.getQueryData<IPagination<IUserDto>>([
        QUERY_KEYS.users,
        page,
      ]);

      console.log("userData", userData);

      if (userData?.data) {
        queryClient.setQueryData(
          [QUERY_KEYS.users, page],
          (oldData: IPagination<IUserDto>) => {
            return {
              ...oldData,
              data: oldData.data.filter((user) => user.id !== deleteId),
            };
          }
        );
      }
    },
    // onSettled: async () =>
    //   await queryClient.invalidateQueries({
    //     queryKey: [QUERY_KEYS.users],
    //   }),
  });

  return {
    onDelete: userDeleteMuatation.mutate,
    isPending: userDeleteMuatation.isPending,
  };
};
