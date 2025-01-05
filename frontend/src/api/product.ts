import { useQuery } from "@tanstack/react-query";

import { baseURL } from "@/src/constants/baseURL";

export const useGetProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await fetch(`${baseURL}/product`, { method: "GET" });
      return response.json();
    },
    initialData: [],
  });
};

export const useGetProduct = (id: number) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const response = await fetch(`${baseURL}/product/${id}`, {
        method: "GET",
      });
      return response.json();
    },
  });
};
