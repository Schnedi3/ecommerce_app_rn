import { FlatList, StyleSheet, Text, View } from "react-native";
import { StripeProvider } from "@stripe/stripe-react-native";
import { Stack } from "expo-router";

import { useGetCart } from "@/src/api/cart";
import { CartItem } from "@/src/components/CartItem";
import { ICartItem } from "@/src/types/types";
import { Payment } from "@/src/components/Payment";
import { useThemeColor } from "@/src/hooks/useThemeColor";

const publishableKey = process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY as string;

export default function Cart(): JSX.Element {
  const { color } = useThemeColor();
  const { data: cart } = useGetCart();

  const totalCart = cart.reduce(
    (acc: number, item: ICartItem) => acc + item.price * item.quantity,
    0
  );

  return (
    <StripeProvider
      publishableKey={publishableKey}
      merchantIdentifier="merchant.ecommerce.com"
      urlScheme="myapp"
    >
      <Stack.Screen
        options={{ headerShown: true, header: () => <CartHeader /> }}
      />

      {!cart || cart.length === 0 ? (
        <View
          style={[
            styles.emptyContainer,
            { backgroundColor: color.secondaryBg },
          ]}
        >
          <Text style={[styles.empty, { color: color.primaryText }]}>Cart</Text>
        </View>
      ) : (
        <View
          style={[styles.container, { backgroundColor: color.secondaryBg }]}
        >
          <FlatList
            style={{ backgroundColor: color.secondaryBg }}
            contentContainerStyle={styles.contentContainer}
            data={cart}
            renderItem={({ item }) => <CartItem item={item} />}
            keyExtractor={(item) => item.product_id}
          />

          <View style={{ marginTop: "auto", paddingBottom: 30 }}>
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
      )}
    </StripeProvider>
  );
}

const CartHeader = () => {
  const { color } = useThemeColor();

  return (
    <View
      style={[
        headerStyles.header,
        { borderBottomColor: color.border, backgroundColor: color.primaryBg },
      ]}
    >
      <Text style={[headerStyles.title, { color: color.primaryText }]}>
        Cart
      </Text>
    </View>
  );
};

const headerStyles = StyleSheet.create({
  header: {
    height: 50,
    paddingHorizontal: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
  },
  title: {
    fontFamily: "QuickSandBold",
    fontSize: 20,
  },
});

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
    paddingVertical: 10,
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
