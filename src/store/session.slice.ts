import { WrapperSlice } from "@src/store/Wrapper.ts";
import { saveJWT } from "@src/utils/dataInfra.ts";
import { SessionSlice, SessionState } from "@interfaces/userSession";
import { loginService } from "@src/Http/session.service.ts";

export const initialStateSession: SessionState = {
  name: '',
  email: '',
  roles: [],
  token: '',
  username: '',
  isActiveSession: false,
  loading: false,
};

export const useSessionStore = WrapperSlice<SessionSlice>('session', (set) => {
  return {
    ...initialStateSession,
    login: async (email: string, password: string) => {
      set({ loading: true });
      try {
        const response = await loginService({ email, password });
        saveJWT(response.data.token);
        return set({
          name: response.data.name,
          username: response.data.username,
          email: response.data.email,
          token: response.data.token,
          roles: response.data.roles,
          isActiveSession: true,
        });
      } catch (e) {
        console.error(e);
      } finally {
        set({ loading: false });
      }
    },
    logout: async () => set(initialStateSession, false)
  }
});
