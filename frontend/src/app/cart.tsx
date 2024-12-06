import { FlatList, StyleSheet, Text, useColorScheme, View } from "react-native";
import { StripeProvider } from "@stripe/stripe-react-native";

import Colors from "@/src/constants/Colors";
import { useGetCart } from "@/src/api/cart";
import CartItem from "@/src/components/CartItem";
import { ICartItem } from "@/src/types/types";
import Payment from "@/src/components/Payment";

const publishableKey = process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY as string;

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
    <StripeProvider
      publishableKey={publishableKey}
      merchantIdentifier="merchant.ecommerce.com"
      urlScheme="myapp"
    >
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

          <Payment totalCart={totalCart} />
        </View>
      </View>
    </StripeProvider>
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
});
