export interface SessionState {
  name: string;
  roles: string[];
  username: string;
  email: string;
  token: string;
}

export interface SessionActions {
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
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

