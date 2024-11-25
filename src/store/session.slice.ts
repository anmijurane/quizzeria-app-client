import { create } from "zustand";
import { HTTP } from "../Http/AxiosInstance";
import {LoginRequest, LoginResponse, SessionSlice, SessionState} from "../interfaces/userSession";
import {saveJWT} from "../utils/dataInfra.ts";

export const initialStateSession: SessionState = {
  name: '',
  email: '',
  roles: [],
  token: '',
  username: ''
}

export const useSessionStore = create<SessionSlice>((set) => {
  return {
    ...initialStateSession,
    login: async (email: string, password: string) => {
      const response = await HTTP.POST<LoginResponse, LoginRequest>('/api/auth/login', { email, password });
      saveJWT(response.data.token);
      return set({
        name: response.data.name,
        username: response.data.username,
        email: response.data.email,
        token: response.data.token,
        roles: response.data.roles,
      })
    },
    logout: async () => {
      // await HTTP.POST<>('/api/auth/logout');
      set(initialStateSession, false);
    }
  }
})
