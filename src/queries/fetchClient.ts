const BASE_URL = import.meta.env.VITE_API_URL;

class ApiError extends Error {
  constructor(public response: Response, defaultErrorMessage?: string) {
    super(`ApiError:${response.status} ${", " + defaultErrorMessage}`);
  }
}

export const fetchClient = async <T>(
  url: string,
  initial: RequestInit,
  defaultErrorMessage?: string
) => {
  const response = await fetch(`${BASE_URL}${url}`, {
    ...initial,
  });

  if (!response.ok) {
    console.log("fetchClient error", response);
    // throw new ApiError(response);
    throw new ApiError(response, defaultErrorMessage);
  }

  return (await response.json()) as Promise<T>;
};
