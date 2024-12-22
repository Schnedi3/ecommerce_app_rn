import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { IAuthStore } from "@/src/types/types";
import { zustandStorage } from "./zustandStorage";

export const useAuthStore = create(
  persist<IAuthStore>(
    (set) => ({
      isAuthenticated: false,
      setIsAuthenticated: (isAuthenticated: boolean) =>
        set({ isAuthenticated }),
    }),
    {
      name: "isAuthenticated",
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
