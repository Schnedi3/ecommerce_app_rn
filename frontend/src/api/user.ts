import { useMutation } from "@tanstack/react-query";

import { baseURL } from "@/src/constants/baseURL";

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
      return fetch(`${baseURL}/user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, firstName, lastName, email }),
      });
    },
  });
};
