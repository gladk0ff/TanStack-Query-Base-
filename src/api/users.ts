export interface IUserDto {
  id: string;
  age: string;
  firstName: string;
}

export const getUsers = async ({
  signal,
}: {
  signal: AbortSignal;
}): Promise<{ users: IUserDto[] }> => {
  return fetch('https://dummyjson.com/users', { signal }).then((res) =>
    res.json()
  );
};
