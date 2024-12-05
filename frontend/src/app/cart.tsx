import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";

import Colors from "@/src/constants/Colors";
import { useGetCart } from "@/src/api/cart";
import CartItem from "@/src/components/CartItem";
import { ICartItem } from "@/src/types/types";

export default function Cart(): JSX.Element {
  const colorTheme = useColorScheme();
  const color = Colors[colorTheme ?? "light"];

  const { data: cart } = useGetCart();

  const totalCart = cart.reduce(
    (acc: number, item: ICartItem) => acc + item.price * item.quantity,
    0
  );

  if (!cart || cart.length === 0) {
    return (
      <View
        style={[styles.emptyContainer, { backgroundColor: color.secondaryBg }]}
      >
        <Text style={[styles.empty, { color: color.primaryText }]}>Cart</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: color.secondaryBg }]}>
      <View>
        <FlatList
          style={{ backgroundColor: color.secondaryBg }}
          contentContainerStyle={styles.contentContainer}
          data={cart}
          renderItem={({ item }) => <CartItem item={item} />}
          keyExtractor={(item) => item.product_id}
        />

        <View style={styles.totalContainer}>
          <Text style={[styles.totalText, { color: color.primaryText }]}>
            Total
          </Text>
          <Text style={[styles.total, { color: color.accent }]}>
            {totalCart}€
          </Text>
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.checkout,
            { backgroundColor: pressed ? color.accent : color.invertedBg },
          ]}
        >
          <Text style={[styles.checkoutText, { color: color.invertedText }]}>
            Checkout
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  empty: {
    fontFamily: "QuickSandBold",
    fontSize: 60,
    opacity: 0.35,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingVertical: 15,
  },
  totalContainer: {
    marginHorizontal: "5%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  totalText: {
    fontFamily: "QuickSandMedium",
    fontSize: 20,
  },
  total: {
    fontFamily: "QuickSandBold",
    fontSize: 28,
  },
  checkout: {
    marginHorizontal: "5%",
    marginTop: 25,
    padding: 16,
    borderRadius: 4,
  },
  checkoutText: {
    fontFamily: "QuickSandMedium",
    fontSize: 18,
    textAlign: "center",
    textTransform: "uppercase",
  },
});
