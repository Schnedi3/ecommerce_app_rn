import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "@/src/constants/Colors";
import { useDeleteFromCart } from "@/src/api/cart";
import { ICartItem } from "@/src/types/types";

export default function CartItem({ item }: { item: ICartItem }) {
  const colorTheme = useColorScheme();
  const color = Colors[colorTheme ?? "light"];

  const { title, image, price, quantity, product_id } = item;
  const { mutate: deleteFromCart } = useDeleteFromCart();

  return (
    <View style={[styles.itemContainer, { borderBottomColor: color.border }]}>
      <Image source={{ uri: image }} style={styles.image} />

      <View style={styles.titlePrice}>
        <Text style={[styles.title, { color: color.secondaryText }]}>
          {title}
        </Text>
        <Text style={[styles.price, { color: color.accent }]}>{price}€</Text>
      </View>

      <View style={styles.quantityContainer}>
        <Pressable onPress={() => deleteFromCart(product_id)}>
          {({ pressed }) => (
            <Ionicons
              name="trash-outline"
              size={24}
              color={pressed ? color.accent : color.secondaryText}
            />
          )}
        </Pressable>

        <View style={styles.quantity}>
          <Pressable>
            {({ pressed }) => (
              <Ionicons
                name="remove-circle-outline"
                size={26}
                color={pressed ? color.accent : color.secondaryText}
              />
            )}
          </Pressable>
          <Text style={[styles.quantityText, { color: color.secondaryText }]}>
            {quantity}
          </Text>
          <Pressable>
            {({ pressed }) => (
              <Ionicons
                name="add-circle-outline"
                size={26}
                color={pressed ? color.accent : color.secondaryText}
              />
            )}
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    width: "90%",
    marginHorizontal: "auto",
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    borderBottomWidth: 1,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 4,
  },
  titlePrice: {
    gap: 5,
  },
  title: {
    fontFamily: "QuickSandSemi",
    fontSize: 18,
  },
  price: {
    fontFamily: "QuickSandBold",
    fontSize: 22,
  },
  quantityContainer: {
    gap: 6,
    alignItems: "flex-end",
    marginLeft: "auto",
  },
  quantity: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  quantityText: {
    paddingBottom: 5,
    fontFamily: "QuickSandSemi",
    fontSize: 24,
  },
});
