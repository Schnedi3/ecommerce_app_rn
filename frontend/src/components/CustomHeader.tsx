import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";

import { useAuthStore } from "@/src/store/authStore";
import { useGetCart } from "@/src/api/cart";
import { ICartItem } from "@/src/types/types";
import { useThemeColor } from "@/src/hooks/useThemeColor";

export const CustomHeader = ({ title }: { title: string }) => {
  const { color } = useThemeColor();
  const { isAuthenticated } = useAuthStore();
  const { data: cart } = useGetCart();

  const itemsInCart = cart?.reduce(
    (acc: number, item: ICartItem) => acc + item.quantity,
    0
  );

  return (
    <View
      style={[
        styles.header,
        { borderBottomColor: color.border, backgroundColor: color.primaryBg },
      ]}
    >
      <Text style={[styles.title, { color: color.primaryText }]}>
        {title ? title : "Loading"}
      </Text>

      <Link href="/cart" asChild>
        <TouchableOpacity activeOpacity={0.5} disabled={!isAuthenticated}>
          <AntDesign
            name="shoppingcart"
            style={{ color: color.secondaryText, fontSize: 24 }}
          />
          {cart.length > 0 && (
            <View style={[styles.badge, { backgroundColor: color.accent }]}>
              <Text style={[styles.badgeText, { color: color.invertedText }]}>
                {itemsInCart}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 50,
    paddingHorizontal: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
  },
  title: {
    fontFamily: "QuickSandBold",
    fontSize: 20,
  },
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
