import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useDeleteFromCart } from "@/src/api/cart";
import { ICartItem } from "@/src/types/types";
import { useThemeColor } from "@/src/hooks/useThemeColor";
import Animated, { SlideOutRight } from "react-native-reanimated";

export const CartItem = ({ item }: { item: ICartItem }) => {
  const { color } = useThemeColor();

  const { title, image, price, quantity, product_id } = item;
  const { mutate: deleteFromCart } = useDeleteFromCart();

  return (
    <Animated.View
      style={[styles.itemContainer, { borderBottomColor: color.border }]}
      exiting={SlideOutRight}
    >
      <Image source={{ uri: image }} style={styles.image} />

      <View style={styles.titlePrice}>
        <Text style={[styles.title, { color: color.secondaryText }]}>
          {title}
        </Text>
        <View style={styles.priceQuantity}>
          <Text style={[styles.price, { color: color.accent }]}>{price}€</Text>
          <Text style={[styles.ex, { color: color.secondaryText }]}>x</Text>
          <Text style={[styles.quantityText, { color: color.secondaryText }]}>
            {quantity}
          </Text>
        </View>
      </View>

      <View style={styles.deleteTotal}>
        <Pressable
          style={{ alignSelf: "flex-end" }}
          onPress={() => deleteFromCart(product_id)}
        >
          {({ pressed }) => (
            <Ionicons
              name="trash-outline"
              size={24}
              color={pressed ? color.accent : color.secondaryText}
            />
          )}
        </Pressable>
        <Text style={[styles.total, { color: color.secondaryText }]}>
          {price * quantity}€
        </Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  titlePrice: {
    paddingLeft: 20,
  },
  title: {
    width: 250,
    fontFamily: "QuickSandSemi",
    fontSize: 16,
  },
  priceQuantity: {
    flexDirection: "row",
    gap: 15,
  },
  price: {
    fontFamily: "QuickSandBold",
    fontSize: 20,
  },
  ex: {
    fontFamily: "QuickSandSemi",
    fontSize: 20,
  },
  quantityText: {
    paddingBottom: 5,
    fontFamily: "QuickSandSemi",
    fontSize: 20,
  },
  deleteTotal: {
    marginLeft: "auto",
    right: 0,
    gap: 5,
  },
  total: {
    fontFamily: "QuickSandMedium",
    fontSize: 17,
  },
});
