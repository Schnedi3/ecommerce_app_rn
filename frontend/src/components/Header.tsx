import { StyleSheet, Text, useColorScheme, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";

import Colors from "@/src/constants/Colors";
import { useAuthStore } from "@/src/store/authStore";
import { useGetCart } from "@/src/api/cart";
import { ICartItem } from "@/src/types/types";

export default function Header() {
  const colorTheme = useColorScheme();
  const color = Colors[colorTheme ?? "light"];

  const { isAuthenticated } = useAuthStore();
  const { data: cart } = useGetCart();

  const itemsInCart = cart?.reduce(
    (acc: number, item: ICartItem) => acc + item.quantity,
    0
  );

  return (
    <View style={{ paddingHorizontal: 5 }}>
      {isAuthenticated && (
        <View>
          <AntDesign
            name="shoppingcart"
            size={24}
            color={color.secondaryText}
            onPress={() => router.push("/cart")}
          />
          {cart.length > 0 && (
            <View style={[styles.badge, { backgroundColor: color.accent }]}>
              <Text style={[styles.badgeText, { color: color.invertedText }]}>
                {itemsInCart}
              </Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    width: 16,
    height: 16,
    position: "absolute",
    top: 10,
    left: 14,
    borderRadius: 20,
    alignItems: "center",
  },
  badgeText: {
    top: -1,
    fontFamily: "QuickSandBold",
    fontSize: 11,
  },
});
