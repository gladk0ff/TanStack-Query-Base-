import { IPagination } from "../types";

export interface IUserDto {
  id: string;
  age: string;
  firstName: string;
}

const BASE_URL = import.meta.env.VITE_API_URL;

export const getUsers = async (
  { page }: { page: number },
  { signal }: { signal: AbortSignal }
): Promise<IPagination<IUserDto>> => {
  return fetch(`${BASE_URL}/users?_page=${page}&_per_page=10`, {
    signal,
  })
    .then((res) => res.json())
    .catch(() => {
      throw new Error(`Не удалось загрузить страницу:${page} с пользователям`);
    });
};

export const getAllUsers = async ({
  signal,
}: {
  signal: AbortSignal;
}): Promise<IUserDto[]> => {
  return fetch(`${BASE_URL}/users`, { signal }).then((res) => res.json());
};
