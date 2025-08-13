import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface User {
  id: string;
  name: string;
  email: string;
}
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    immer((set) => ({
      user: null,
      isAuthenticated: false,
      login: (user) => {
        set((state) => {
          state.user = user;
          state.isAuthenticated = true;
        });
      },
      logout: () => {},
    }))
  )
);
