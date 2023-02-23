import axios from 'axios';
import { QueryClient } from 'react-query';

export const initFetchInstance = (URL) =>
  axios.create({
    baseURL: 'https://api.upbit.com' + URL,
    timeout: 10000,
    headers: {
      Accept: 'application/json',
    },
  });

export const fetchInstance = () => initFetchInstance('');

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      suspense: true,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
  },
});
