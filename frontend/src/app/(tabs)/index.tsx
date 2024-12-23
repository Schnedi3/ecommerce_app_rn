import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { Link } from "expo-router";

import { useGetProducts } from "@/src/api/product";
import { ProductCard } from "@/src/components/ProductCard";
import { useThemeColor } from "@/src/hooks/useThemeColor";

export default function Home(): JSX.Element {
  const { color } = useThemeColor();
  const { data: products } = useGetProducts();

  if (!products) {
    return (
      <View style={[styles.loading, { backgroundColor: color.secondaryBg }]}>
        <ActivityIndicator size="large" color={color.accent} />
      </View>
    );
  }

  return (
    <FlatList
      style={{ backgroundColor: color.secondaryBg }}
      contentContainerStyle={styles.contentContainer}
      columnWrapperStyle={{ justifyContent: "space-between" }}
      data={products}
      numColumns={2}
      renderItem={({ item }) => (
        <Link href={`/detail/${item.id}`}>
          <ProductCard product={item} />
        </Link>
      )}
      keyExtractor={(item) => item.id}
    />
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    padding: 20,
    gap: 20,
  },
});
