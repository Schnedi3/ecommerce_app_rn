import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { router } from "expo-router";

import { ICartItem, IProduct } from "@/src/types/types";
import Colors from "@/src/constants/Colors";
import { useGetCart } from "@/src/api/cart";
import { useAuthStore } from "@/src/store/authStore";

const { width } = Dimensions.get("window");

export default function ProductCard({
  product,
}: {
  product: IProduct;
}): JSX.Element {
  const colorTheme = useColorScheme();
  const color = Colors[colorTheme ?? "light"];

  const { id, title, image, price } = product;
  const { data: cart } = useGetCart();
  const { isAuthenticated } = useAuthStore();

  const inCart = cart.some((item: ICartItem) => item.product_id === id);

  return (
    <Pressable
      style={[
        styles.singleCard,
        {
          borderColor: color.border,
        },
      ]}
      onPress={() =>
        router.push({
          pathname: "/detail/[id]",
          params: { id },
        })
      }
    >
      <Image source={{ uri: image }} style={styles.image} />
      <View>
        <Text style={[styles.title, { color: color.secondaryText }]}>
          {title}
        </Text>

        <View style={styles.priceContainer}>
          <Text style={[styles.price, { color: color.primaryText }]}>
            {price}€
          </Text>
          {isAuthenticated && inCart && (
            <Text
              style={[
                styles.inCart,
                { backgroundColor: color.accent, color: color.invertedText },
              ]}
            >
              in cart
            </Text>
          )}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  singleCard: {
    width: width / 2 - 30,
    height: width * 0.7,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },
  image: {
    width: "100%",
    height: "80%",
    borderRadius: 10,
  },
  title: {
    fontFamily: "QuickSandSemi",
    fontSize: 14,
  },
  priceContainer: {
    width: "99%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inCart: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    fontSize: 10,
    borderRadius: 10,
    textTransform: "uppercase",
  },
  price: {
    fontFamily: "QuickSandBold",
    fontSize: 20,
  },
});
