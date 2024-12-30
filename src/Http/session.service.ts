import {HTTP} from "@src/Http/AxiosInstance.ts";
import {LoginRequest, LoginResponse, LogoutRequest, VerifySessionResponse} from "@interfaces/userSession.ts";
import {ServiceLogin, ServiceLogout, ServiceVerifySession} from "@interfaces/http-service.interface.ts";

const API_URL = '/api/auth';
const LOGIN_URL = `${API_URL}/login`;
const LOGOUT_URL = `${API_URL}/logout`;
const CHECK_SESSION_URL = `${API_URL}/verify-session`;

export const loginService: ServiceLogin = async ({ email, password }) => {
  const response = await HTTP.POST<LoginResponse, LoginRequest>(LOGIN_URL, { email, password });
  return response;
}

export const logoutService: ServiceLogout = async () => {
  return await HTTP.POST<void, LogoutRequest>(LOGOUT_URL, {});
}

export const checkSessionService: ServiceVerifySession = async () => {
  return await HTTP.GET<VerifySessionResponse>(CHECK_SESSION_URL);
}
