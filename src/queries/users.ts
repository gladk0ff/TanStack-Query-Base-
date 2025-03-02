import { getAllUsers, IUserDto } from "./../api/users";
import { getUsers } from "../api/users";
import {
  infiniteQueryOptions,
  keepPreviousData,
  queryOptions,
} from "@tanstack/react-query";
import { INITIAL_ALL_DATA } from "../components/initialData";

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

export const getUsersWithPagination = (page: number, isEnabled: boolean) => {
  return queryOptions({
    // staleTime: Infinity,
    // gcTime: 1000,
    queryKey: ["users", page],
    queryFn: ({ queryKey, signal }) =>
      getUsers({ page: queryKey[1] as number }, { signal }),
    placeholderData: keepPreviousData, // так же можно задать и функцию
    // наполняет кеш  запроса из другого источника (localeStorage,somedata)
    // очень полезен для ssr
    // initialData: INITIAL_DATA as unknown as IPagination<IUserDto>,
    enabled: isEnabled,
  });
};

export const getUsersAll = (isEnabled: boolean) => {
  return queryOptions({
    queryKey: ["users-all"],
    queryFn: (meta) => getAllUsers(meta),
    enabled: isEnabled,
    initialData: INITIAL_ALL_DATA as unknown as IUserDto[],
  });
};
