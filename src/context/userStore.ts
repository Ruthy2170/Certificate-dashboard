import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/types/User";

interface AuthState {
    token: string | null;
    user: User | null;
    setAuth: (token: string, user: User) => void;
    logOut: () => void;
}

const useUserStore = create<AuthState>()(
    persist(
        (set) => ({
            token: null,
            user: null,
            setAuth: (token, user) => set({ token, user }),
            logOut: () => set({ token: null, user: null }),
        }),
        {
            name: "auth-storage",
            partialize: (state) => ({ token: state.token, user: state.user }),
        },
    ),
);

export default useUserStore;
