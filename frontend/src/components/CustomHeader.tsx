import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Link, router } from "expo-router";

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
      style={{
        width: "100%",
        height: 50,
        paddingHorizontal: 15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: color.primaryBg,
        borderBottomWidth: 1,
        borderColor: color.border,
      }}
    >
      <TouchableOpacity onPress={() => router.back()} activeOpacity={0.5}>
        <Ionicons name="chevron-down" size={24} color={color.primaryText} />
      </TouchableOpacity>

      <Text
        style={[
          {
            fontFamily: "QuickSandBold",
            fontSize: 20,
            color: color.primaryText,
          },
        ]}
      >
        {title}
      </Text>

      <Link href="/(modals)/cart" asChild>
        <TouchableOpacity activeOpacity={0.5} disabled={!isAuthenticated}>
          <AntDesign
            name="shoppingcart"
            size={24}
            color={color.secondaryText}
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
