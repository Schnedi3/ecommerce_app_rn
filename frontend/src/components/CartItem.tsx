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
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    marginHorizontal: "5%",
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 25,
    borderBottomWidth: 1,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 4,
  },
  titlePrice: {
    gap: 0,
  },
  title: {
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
    gap: 5,
  },
  total: {
    fontFamily: "QuickSandMedium",
    fontSize: 17,
  },
});
