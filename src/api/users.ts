export interface IUserDto {
  id: string;
  age: string;
  firstName: string;
}

const BASE_URL = import.meta.env.VITE_API_URL;

export const getUsers = async ({
  signal,
}: {
  signal: AbortSignal;
  }): Promise<IUserDto[]> => {
  console.log("signal  ",signal);
  
  return fetch(`${BASE_URL}/users`, { signal }).then((res) =>
    res.json()
  );
};
