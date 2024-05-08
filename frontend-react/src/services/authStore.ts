import { create } from "zustand";
import { persist } from "zustand/middleware";
import { initUserLogin, UserLogin } from "./userLogin-service";

interface AuthStore {
  isLoggedIn: boolean;
  isTokenExpired?: boolean;
  login: (user: UserLogin) => void;
  logout: () => void;
  checkTokenExpired: () => void;
  currentUser?: UserLogin;
}

const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      isLoggedIn: false,
      isTokenExpired: true,
      login: (user: UserLogin) => {
        const userLocalStorage = localStorage.getItem("access_token");
        if (userLocalStorage) {
          set({ isLoggedIn: true });
          set({ currentUser: user });
        }
      },
      logout: () => {
        set({ isLoggedIn: false });
        set({ currentUser: initUserLogin });
        localStorage.clear();
      },

      checkTokenExpired: () => {
        const token = localStorage.getItem("access_token");
        if (token) {
          const expiry = JSON.parse(atob(token.split(".")[1])).exp;
          Math.floor(new Date().getTime() / 1000) >= expiry
            ? set({ isTokenExpired: true })
            : set({ isTokenExpired: false });
        } else {
          set({ isTokenExpired: true });
        }
      },
    }),
    {
      name: "userLoginStatus",
    }
  )
);

export default useAuthStore;
