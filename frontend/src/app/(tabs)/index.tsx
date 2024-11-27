import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";

import Colors from "@/src/constants/Colors";
import { useGetProducts } from "@/src/api/product";
import ProductCard from "@/src/components/ProductCard";

export default function Home(): JSX.Element {
  const colorTheme = useColorScheme();
  const color = Colors[colorTheme ?? "light"];
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
      renderItem={({ item }) => <ProductCard product={item} />}
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
