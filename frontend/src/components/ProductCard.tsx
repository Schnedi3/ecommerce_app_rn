import { Dimensions, Image, StyleSheet, Text, View } from "react-native";

import { ICartItem, IProduct } from "@/src/types/types";
import { useGetCart } from "@/src/api/cart";
import { useAuthStore } from "@/src/store/authStore";
import { useThemeColor } from "@/src/hooks/useThemeColor";

const { width } = Dimensions.get("window");

export default function ProductCard({
  product,
}: {
  product: IProduct;
}): JSX.Element {
  const { color } = useThemeColor();

  const { id, title, image, price } = product;
  const { data: cart } = useGetCart();
  const { isAuthenticated } = useAuthStore();

  const inCart = cart.some((item: ICartItem) => item.product_id === id);

  return (
    <View style={[styles.singleCard, { borderColor: color.border }]}>
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
    </View>
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
    paddingHorizontal: 8,
    paddingVertical: 1,
    fontFamily: "QuickSandBold",
    fontSize: 10,
    borderRadius: 10,
    textTransform: "uppercase",
  },
  price: {
    fontFamily: "QuickSandBold",
    fontSize: 20,
  },
});
