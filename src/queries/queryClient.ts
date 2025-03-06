import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // retry: 1, // сколько почему +1 не понятно,
      // retryDelay: 500, // как часто
      refetchOnWindowFocus: false, // надо ли при фокусе окна
      // refetchOnMount: false, //перезапрашивать при перерисовке
      // refetchOnReconnect: true, //при появляении интернеат
    },
  },
});
