import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "./main.css";
import { BrowserRouter } from "react-router";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // почему +1 запрос - первый не считается,
      retryDelay: 500, // как часто
      // refetchOnWindowFocus: false, // надо ли при фокусе окна
      // refetchOnMount: false, //перезапрашивать при перерисовке
      // refetchOnReconnect: true, //при появляении интернеат
    },
  },
});

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
  // </StrictMode>
);
