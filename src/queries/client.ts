const BASE_URL = import.meta.env.VITE_API_URL;

class ApiError extends Error {
  constructor(public response: Response) {
    super(`ApiError:${response.status}`);
  }
}

export const jsonFetch = async <T>(url: string, initial: RequestInit) => {
  const response = await fetch(`${BASE_URL}${url}`, {
    ...initial,
  });

  if (!response.ok) {
    throw new ApiError(response);
  }

  return (await response.json()) as Promise<T>;
};
