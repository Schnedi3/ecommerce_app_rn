import { useMutation } from "@tanstack/react-query";

import { customAxios } from "./customAxios";

export const useSaveUser = () => {
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
  });
};
