import {
  infiniteQueryOptions,
  keepPreviousData,
  queryOptions,
} from "@tanstack/react-query";
import { INITIAL_ALL_DATA } from "./initialData";
import { fetchClient } from "./client";
import { IPagination } from "../types";

export interface IUserDto {
  id: string;
  age: number;
  firstName: string;
}

export const getUsersInfinity = () => {
  return infiniteQueryOptions({
    queryKey: ["users-infinity"],
    queryFn: ({ signal, pageParam }) =>
      fetchClient<IPagination<IUserDto>>(
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
      fetchClient<IPagination<IUserDto>>(
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
    queryFn: (meta) => fetchClient("/users", meta),
    enabled: isEnabled,
    initialData: INITIAL_ALL_DATA as unknown as IUserDto[],
  });
};

export const createUser = async (newUser: {
  firstName: string;
  age: number;
}) => {
  fetchClient<IUserDto>("/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  });
};

export const updateUser = async (user: IUserDto) => {
  fetchClient<IUserDto>(`/users/${user.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
};

export const deleteUser = async (id: string) => {
  fetchClient(`/users/${id}`, {
    method: "DELETE",
  });
};
