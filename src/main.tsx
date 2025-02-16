import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import './main.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // сколько почему +1 не понятно,
      retryDelay: 500,// как часто
      refetchOnWindowFocus: false,// надо ли при фокусе окна
      refetchOnMount: false,//перезапрашивать при перерисовке
      refetchOnReconnect: true,//при появляении интернеат
    }
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);
