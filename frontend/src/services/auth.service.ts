import api from '@/lib/api';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData extends LoginCredentials {
  name: string;
}

export const login = async (credentials: LoginCredentials) => {
  const response = await api.post('/v1/auth/login', credentials);
  return response.data;
};

export const register = async (userData: RegisterData) => {
  const response = await api.post('/v1/auth/signup', userData);
  return response.data;
};

export const logout = async () => {
  // Clear local storage is handled by the auth context
  return Promise.resolve();
};
