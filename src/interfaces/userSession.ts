export interface SessionState {
  name: string;
  roles: string[];
  username: string;
  email: string;
  token: string;
  isActiveSession: boolean;
  loading: boolean;
}

export interface ResolveServerRequest {
  status: number;
  codeError?: string;
}

export interface SessionActions {
  login: (username: string, password: string) => Promise<ResolveServerRequest>;
  logout: () => Promise<void>;
  checkSession: () => Promise<void>;
}

export type SessionSlice = SessionState & SessionActions;

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  email: string;
  id: string;
  name: string;
  roles: string[];
  token: string;
  username: string;
}

export interface LogoutRequest {};

export interface LoginResponse {};

export interface VerifySessionResponse {
  user: LoginResponse;
  activeSession: boolean;
};
