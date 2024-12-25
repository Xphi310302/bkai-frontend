import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL;

export interface LoginCredentials {
  username: string;
  password: string;
}

interface AuthResponse {
  access_token: string;
  refresh_token: string;
}

interface ErrorResponse {
  status_code: number;
  detail: string;
}

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  try {
    const response = await axios.post<AuthResponse | ErrorResponse>(`${API_URL}/api/v1/login`, credentials);
    
    if ('detail' in response.data) {
      const errorData = response.data as ErrorResponse;
      if (errorData.detail === 'Invalid password') {
        throw new Error('Sai mật khẩu');
      } else if (errorData.detail === 'Invalid username') {
        throw new Error('Tài khoản không tồn tại');
      }
      throw new Error(errorData.detail);
    }

    const authData = response.data as AuthResponse;
    if (authData.access_token) {
      localStorage.setItem('access_token', authData.access_token);
      localStorage.setItem('refresh_token', authData.refresh_token);
    }
    return authData;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Có lỗi xảy ra. Vui lòng thử lại sau.');
  }
};

export const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
};

export const getAccessToken = () => {
  return localStorage.getItem('access_token');
};

export const getRefreshToken = () => {
  return localStorage.getItem('refresh_token');
};

export const isAuthenticated = () => {
  return !!getAccessToken();
};
