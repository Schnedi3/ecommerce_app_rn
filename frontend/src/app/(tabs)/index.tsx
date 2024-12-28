import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Link, Stack } from "expo-router";

import { useGetProducts } from "@/src/api/product";
import { ProductCard } from "@/src/components/ProductCard";
import { useThemeColor } from "@/src/hooks/useThemeColor";
import { CustomHeader } from "@/src/components/CustomHeader";
import { IProduct } from "@/src/types/types";

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
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          header: () => <CustomHeader title="Home" />,
        }}
      />

      <FlatList
        style={{ backgroundColor: color.secondaryBg }}
        contentContainerStyle={styles.contentContainer}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        data={products as IProduct[]}
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
    padding: 20,
    gap: 20,
  },
});
