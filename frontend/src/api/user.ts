import { useMutation } from "@tanstack/react-query";

import { customAxios } from "./customAxios";

export const useSaveUser = () => {
  return useMutation({
    mutationFn: ({
      id,
      firstName,
      lastName,
      email,
    }: {
      id: string;
      firstName: string | null;
      lastName: string | null;
      email: string;
    }) => {
      return customAxios.post("/user", { id, firstName, lastName, email });
    },
  });
};
