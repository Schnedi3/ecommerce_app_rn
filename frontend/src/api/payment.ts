import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-expo";

import { baseURL } from "@/src/constants/baseURL";

export const usePayment = () => {
  const { getToken } = useAuth();

  return useMutation({
    mutationFn: async (totalCart: number) => {
      const token = await getToken();
      return fetch(`${baseURL}/stripe/payment-sheet`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ totalCart }),
      });
    },
  });
};
