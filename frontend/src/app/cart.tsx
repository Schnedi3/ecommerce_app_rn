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

export default function Cart(): JSX.Element {
  const colorTheme = useColorScheme();
  const color = Colors[colorTheme ?? "light"];

  const { data: cart } = useGetCart();

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
  checkout: {
    width: "90%",
    marginHorizontal: "auto",
    marginTop: 15,
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
