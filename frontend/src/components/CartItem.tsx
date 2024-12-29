import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";

import { useDeleteFromCart } from "@/src/api/cart";
import { ICartItem } from "@/src/types/types";
import { useThemeColor } from "@/src/hooks/useThemeColor";
import Animated, { SlideOutRight } from "react-native-reanimated";
import { commonColors } from "../constants/Colors";

export const CartItem = ({ item }: { item: ICartItem }) => {
  const { color } = useThemeColor();

  const { title, image, price, quantity, product_id } = item;
  const { mutate: deleteFromCart } = useDeleteFromCart();

  return (
    <GestureHandlerRootView>
      <Swipeable
        renderRightActions={() => (
          <Pressable
            style={[styles.deleteButton, { backgroundColor: color.delete }]}
            onPress={() => deleteFromCart(product_id)}
          >
            <Ionicons
              name="trash-bin-outline"
              size={24}
              color={commonColors.whiteText}
            />
          </Pressable>
        )}
      >
        <Animated.View
          style={[
            styles.itemContainer,
            {
              borderBottomColor: color.border,
              backgroundColor: color.secondaryBg,
            },
          ]}
          exiting={SlideOutRight}
        >
          <Image source={{ uri: image }} style={styles.image} />

          <View style={styles.titlePrice}>
            <Text style={[styles.title, { color: color.secondaryText }]}>
              {title}
            </Text>
            <View style={styles.priceQuantity}>
              <Text style={[styles.price, { color: color.accent }]}>
                {price}€
              </Text>
              <Text style={[styles.ex, { color: color.secondaryText }]}>x</Text>
              <Text
                style={[styles.quantityText, { color: color.secondaryText }]}
              >
                {quantity}
              </Text>
            </View>
          </View>

          <Text style={[styles.total, { color: color.secondaryText }]}>
            {price * quantity}€
          </Text>
        </Animated.View>
      </Swipeable>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    paddingVertical: 14,
    paddingHorizontal: 20,
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
  total: {
    marginLeft: "auto",
    fontFamily: "QuickSandMedium",
    fontSize: 17,
  },
  deleteButton: {
    width: 70,
    alignItems: "center",
    justifyContent: "center",
  },
});
