import { Dimensions, Image, StyleSheet, Text, View } from "react-native";

import { ICartItem, IProduct } from "@/src/types/types";
import { useGetCart } from "@/src/api/cart";
import { useAuthStore } from "@/src/store/authStore";
import { useThemeColor } from "@/src/hooks/useThemeColor";

const { width } = Dimensions.get("window");

export const ProductCard = ({
  product,
}: {
  product: IProduct;
}): JSX.Element => {
  const { color } = useThemeColor();

  const { id, title, image, price } = product;
  const { data: cart } = useGetCart();
  const { isAuthenticated } = useAuthStore();

  const inCart = cart.some((item: ICartItem) => item.product_id === id);

  return (
    <View style={[styles.singleCard, { backgroundColor: "rgba(0,0,0,0.05)" }]}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={{ padding: 10 }}>
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
};

const styles = StyleSheet.create({
  singleCard: {
    width: width / 2 - 30,
    height: width * 0.7,
    paddingBottom: 20,
    justifyContent: "space-between",
    borderRadius: 10,
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
