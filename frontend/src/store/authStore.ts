import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { IAuthStore } from "../types/types";

export const useAuthStore = create(
  persist<IAuthStore>(
    (set) => ({
      isAuthenticated: false,
      setIsAuthenticated: (isAuthenticated: boolean) =>
        set({ isAuthenticated }),
    }),
    {
      name: "isAuthenticated",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
