import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IUserDto, QUERY_KEYS, usersQueries } from "../queries/users";
import { IPagination } from "../types";

export const useUpdateUser = (page: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: usersQueries.updateUser,
    onMutate: async (newUser) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.users] });
      const previosUserData = queryClient.getQueryData<IPagination<IUserDto>>([
        QUERY_KEYS.users,
        page,
      ]);

      if (previosUserData?.data) {
        queryClient.setQueryData([QUERY_KEYS.users, page], (oldUsers: any) => ({
          ...oldUsers,
          data: oldUsers.data.map((user: any) =>
            user.id === newUser.id ? newUser : user
          ),
        }));
      }
      return { previosUserData };
    },
    onError: (err, newUser, context) => {
      if (!context) return;
      queryClient.setQueryData(
        [QUERY_KEYS.users, page],
        context?.previosUserData
      );
    },
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.users],
      }),
  });
};
