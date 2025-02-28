import { getUsers } from "../api/users";
import { infiniteQueryOptions } from "@tanstack/react-query";

export const getUsersInfinity = () => {
  return infiniteQueryOptions({
    queryKey: ["users-infinity"],
    queryFn: ({ signal, pageParam }) =>
      getUsers({ page: pageParam }, { signal }),
    initialPageParam: 1,
    getNextPageParam: (result) => result.next,
    select: (result) => result.pages.map((page) => page.data).flat(),
  });
};
