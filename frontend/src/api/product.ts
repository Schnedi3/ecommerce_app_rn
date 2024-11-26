import { useQuery } from "@tanstack/react-query";

import { customAxios } from "./customAxios";

export const useGetProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await customAxios.get("/product");
      return data;
    },
    initialData: [],
  });
};

export const useGetProduct = (id: number) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data } = await customAxios.get(`/product/${id}`);
      return data;
    },
  });
};
