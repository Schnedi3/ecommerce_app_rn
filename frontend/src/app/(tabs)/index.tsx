import {
  ActivityIndicator,
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";

import Colors from "@/src/constants/Colors";
import { useGetProducts } from "@/src/api/product";
import ProductCard from "@/src/components/ProductCard";
import { IProduct } from "@/src/types/types";

const { width } = Dimensions.get("window");

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
    <ScrollView style={{ backgroundColor: color.secondaryBg }}>
      <View style={styles.productsContainer}>
        {products.map((product: IProduct) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  productsContainer: {
    height: width * 0.55,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 20,
    margin: 20,
  },
});
