import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-expo";

import { customAxios } from "./customAxios";

export const usePayment = () => {
  const { getToken } = useAuth();

  return useMutation({
    mutationFn: async (totalCart: number) => {
      const token = await getToken();
      return customAxios.post(
        "/stripe/payment-sheet",
        { totalCart },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    },
  });
};
