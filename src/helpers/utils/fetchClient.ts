import axios from 'axios';
import { getAuth } from 'firebase/auth';

const fetchClient = () => {
  const defaultOptions = {
    baseURL: process.env.EXPO_PUBLIC_API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const instance = axios.create(defaultOptions);

  instance.interceptors.request.use(async function (config) {
    const token = await getAuth().currentUser?.getIdToken();
    config.headers.Authorization = token ? `Bearer ${token}` : null;
    return config;
  });

  return instance;
};

export default fetchClient;
