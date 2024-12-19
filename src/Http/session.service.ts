import {HTTP} from "@src/Http/AxiosInstance.ts";
import {LoginRequest, LoginResponse, LogoutRequest} from "@interfaces/userSession.ts";
import {ServiceLogin, ServiceLogout} from "@interfaces/http-service.interface.ts";

const API_URL = '/api/auth';
const LOGIN_URL = `${API_URL}/login`;
const LOGOUT_URL = `${API_URL}/logout`;

export const loginService: ServiceLogin = async ({ email, password }) => {
  const response = await HTTP.POST<LoginResponse, LoginRequest>(LOGIN_URL, { email, password });
  return response;
}

export const logoutService: ServiceLogout = async () => {
  return await HTTP.POST<void, LogoutRequest>(LOGOUT_URL, {});
}
