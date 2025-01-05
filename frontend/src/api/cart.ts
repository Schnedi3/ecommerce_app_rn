import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { baseURL } from "@/src/constants/baseURL";
import { useAuthStore } from "@/src/store/authStore";
import { useAuth } from "@clerk/clerk-expo";

export const useGetCart = () => {
  const { isAuthenticated } = useAuthStore();
  const { getToken } = useAuth();

  return useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const token = await getToken();
      const response = await fetch(`${baseURL}/cart`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.json();
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
      return fetch(`${baseURL}/cart/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity }),
      });
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
      return fetch(`${baseURL}/cart/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};
