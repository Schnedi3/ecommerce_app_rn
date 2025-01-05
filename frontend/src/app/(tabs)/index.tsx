import { useMemo, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { Link, Stack } from "expo-router";

import { useGetProducts } from "@/src/api/product";
import { ProductCard } from "@/src/components/home/ProductCard";
import { useThemeColor } from "@/src/hooks/useThemeColor";
import { IProduct } from "@/src/types/types";
import { HomeHeader } from "@/src/components/home/HomeHeader";

export default function Home(): JSX.Element {
  const [search, setSearch] = useState<string>("");
  const { color } = useThemeColor();
  const { data: products } = useGetProducts();

  const filteredProducts = useMemo(() => {
    let filtered = products as IProduct[];

    if (search) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    return filtered;
  }, [products, search]);

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          header: () => <HomeHeader search={search} setSearch={setSearch} />,
        }}
      />

      <FlatList
        contentContainerStyle={[
          styles.contentContainer,
          { backgroundColor: color.secondaryBg },
        ]}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        data={filteredProducts as IProduct[]}
        numColumns={2}
        renderItem={({ item }) => (
          <Link href={`/detail/${item.id}`} asChild>
            <TouchableOpacity activeOpacity={0.5}>
              <ProductCard product={item} />
            </TouchableOpacity>
          </Link>
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    minHeight: "100%",
    padding: 20,
    gap: 20,
  },
});
