import {
  infiniteQueryOptions,
  keepPreviousData,
  queryOptions,
} from "@tanstack/react-query";
import { INITIAL_ALL_DATA } from "./initialData";
import { fetchClient } from "./fetchClient";
import { IPagination } from "../types";

export interface IUserDto {
  id: string;
  age: number;
  firstName: string;
  dateCrated?: string;
}

export const QUERY_KEYS = {
  users: "users",
  usersAll: "users-all",
};

const getUsersInfinity = () => {
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

const getUsersWithPagination = (
  page: number = 1,
  isEnabled: boolean = true
) => {
  return queryOptions({
    queryKey: [QUERY_KEYS.users, page],
    queryFn: ({ queryKey, signal }) =>
      fetchClient<IPagination<IUserDto>>(
        `/users?_sort=dateCrated&_order=asc&_page=${queryKey[1]}&_per_page=10`,
        { signal }
      ),
    placeholderData: keepPreviousData,
    enabled: isEnabled,
  });
};

const getUsersAll = (isEnabled: boolean) => {
  return queryOptions({
    queryKey: [QUERY_KEYS.usersAll],
    queryFn: (meta) => fetchClient("/users", meta),
    enabled: isEnabled,
    initialData: INITIAL_ALL_DATA as unknown as IUserDto[],
  });
};

const createUser = (newUser: { id: string; firstName: string; age: number }) =>
  fetchClient<IUserDto>(
    "/users",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...newUser, dateCrated: new Date() }),
    },
    "Нe удалось создать пользователя"
  );

const updateUser = (user: IUserDto) =>
  fetchClient<IUserDto>(`/users/${user.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

const deleteUser = (id: string) =>
  fetchClient(`/users/${id}`, {
    method: "DELETE",
  });

export const usersQueries = {
  getUsersInfinity,
  getUsersWithPagination,
  getUsersAll,
  createUser,
  updateUser,
  deleteUser,
};
