import type { LoginRequest, LoginResponse, VerifySessionResponse } from "@interfaces/userSession.ts";
import type { AxiosResponse } from "axios";

export type ServiceLogin = (param: LoginRequest) => Promise<AxiosResponse<LoginResponse>>;

export type ServiceLogout = () => Promise<AxiosResponse<void>>;

export type ServiceVerifySession = () => Promise<AxiosResponse<VerifySessionResponse>>
