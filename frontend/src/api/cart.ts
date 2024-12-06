import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-expo";

import { customAxios } from "./customAxios";
import { useAuthStore } from "@/src/store/authStore";

export const useGetCart = () => {
  const { isAuthenticated } = useAuthStore();
  const { getToken } = useAuth();

  return useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const token = await getToken();
      const { data } = await customAxios.get("/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    },
    initialData: [],
    enabled: isAuthenticated,
  });
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();

  return useMutation({
    mutationFn: async ({ id, quantity }: { id: number; quantity: number }) => {
      const token = await getToken();
      return customAxios.post(
        `/cart/${id}`,
        { quantity },
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

export const useDeleteFromCart = () => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();

  return useMutation({
    mutationFn: async (id: number) => {
      const token = await getToken();
      return customAxios.delete(`/cart/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};
