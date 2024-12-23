import { useMutation } from "@tanstack/react-query";

import { customAxios } from "./customAxios";
import { useAuthStore } from "@/src/store/authStore";

export const useSaveUser = () => {
  const { setIsAuthenticated } = useAuthStore();

  return useMutation({
    mutationFn: ({
      id,
      name,
      email,
    }: {
      id: string;
      name: string | null;
      email: string;
    }) => {
      return customAxios.post("/auth", { id, name, email });
    },
    onSuccess: () => {
      setIsAuthenticated(true);
    },
  });
};
