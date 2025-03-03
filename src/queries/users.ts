import {
  infiniteQueryOptions,
  keepPreviousData,
  queryOptions,
} from "@tanstack/react-query";
import { INITIAL_ALL_DATA } from "./initialData";
import { jsonFetch } from "./client";
import { IPagination } from "../types";

export interface IUserDto {
  id: string;
  age: string;
  firstName: string;
}

export const getUsersInfinity = () => {
  return infiniteQueryOptions({
    queryKey: ["users-infinity"],
    queryFn: ({ signal, pageParam }) =>
      jsonFetch<IPagination<IUserDto>>(
        `/users?_page=${pageParam}&_per_page=10`,
        { signal }
      ),
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
      jsonFetch<IPagination<IUserDto>>(
        `/users?_page=${queryKey[1]}&_per_page=10`,
        { signal }
      ),
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
    queryFn: (meta) => jsonFetch("/users", meta),
    enabled: isEnabled,
    initialData: INITIAL_ALL_DATA as unknown as IUserDto[],
  });
};
