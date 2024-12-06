import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-expo";

import { customAxios } from "./customAxios";

export const useAddOrder = () => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();

  return useMutation({
    mutationFn: async (totalCart: number) => {
      const token = await getToken();
      return customAxios.post(
        "/order",
        { totalCart },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};

export const useGetUserOrders = () => {
  const { getToken } = useAuth();

  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const token = await getToken();
      const { data } = await customAxios.get("/order/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    },
  });
};
