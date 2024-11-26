import {
  Dimensions,
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

  // if (isLoading) return <Text>Loading...</Text>;
  // if (error) return <Text>{error.message}</Text>;

  return (
    <ScrollView style={{ backgroundColor: color.secondaryBg }}>
      {products ? (
        <View style={styles.productsContainer}>
          {products.map((product: IProduct) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </View>
      ) : (
        <View style={[styles.empty, { backgroundColor: color.secondaryBg }]}>
          <Text style={[styles.title, { color: color.primaryText }]}>
            Products
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  productsContainer: {
    height: width * 0.55,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 20,
    margin: 20,
  },
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 60,
    fontWeight: "bold",
    opacity: 0.35,
  },
});
