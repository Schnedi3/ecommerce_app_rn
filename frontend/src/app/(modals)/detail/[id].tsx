import { useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { useGetProduct } from "@/src/api/product";
import { useAddToCart, useGetCart } from "@/src/api/cart";
import { ICartItem } from "@/src/types/types";
import { useAuthStore } from "@/src/store/authStore";
import { useThemeColor } from "@/src/hooks/useThemeColor";
import { CartHeader } from "@/src/components/CartHeader";

const { width } = Dimensions.get("window");

export default function Detail(): JSX.Element {
  const [quantity, setQuantity] = useState<number>(1);

  const { color } = useThemeColor();
  const { id } = useLocalSearchParams();
  const { data: product } = useGetProduct(Number(id));
  const { data: cart } = useGetCart();
  const { mutate: addToCart } = useAddToCart();
  const { isAuthenticated } = useAuthStore();

  const inCart = cart.some((item: ICartItem) => item.product_id === Number(id));
  const foundProduct = cart.find(
    (item: ICartItem) => item.product_id === Number(id)
  );

  const decreaseCartQuantity = () => {
    setQuantity((prevQuantity: number) => prevQuantity - 1);
  };
  const increaseCartQuantity = () => {
    setQuantity((prevQuantity: number) => prevQuantity + 1);
  };

  if (!product) {
    return (
      <View style={[styles.loading, { backgroundColor: color.secondaryBg }]}>
        <ActivityIndicator size="large" color={color.accent} />
      </View>
    );
  }
  const { title, description, image, price } = product;

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          animation: "slide_from_bottom",
          headerTitle: title,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "QuickSandBold",
            fontSize: 20,
            color: color.primaryText,
          },
          headerShadowVisible: false,
          headerStyle: { backgroundColor: "transparent" },
          headerLeft: () => {
            return (
              <TouchableOpacity
                onPress={() => router.back()}
                activeOpacity={0.5}
              >
                <Ionicons
                  name="chevron-down"
                  size={24}
                  color={color.primaryText}
                />
              </TouchableOpacity>
            );
          },
          headerRight: () => <CartHeader />,
          headerBackground: () => (
            <View
              style={[
                {
                  flex: 1,
                  backgroundColor: color.primaryBg,
                  borderBottomWidth: 1,
                  borderBottomColor: color.border,
                },
              ]}
            />
          ),
        }}
      />

      <View style={[styles.container, { backgroundColor: color.secondaryBg }]}>
        <Image source={{ uri: image }} style={styles.image} />
        <View style={styles.info}>
          <Text style={[styles.title, { color: color.primaryText }]}>
            {title}
          </Text>
          <Text style={[styles.price, { color: color.accent }]}>{price}€</Text>
          <Text style={[styles.desc, { color: color.secondaryText }]}>
            {description}
          </Text>
        </View>

        <View style={styles.quantity}>
          <Pressable
            style={({ pressed }) => [
              styles.quantityButton,
              { borderColor: pressed ? color.accent : color.secondaryText },
            ]}
            onPress={decreaseCartQuantity}
            disabled={quantity === 1}
          >
            <Ionicons
              style={{ textAlign: "center" }}
              name="remove-outline"
              size={26}
              color={color.secondaryText}
            />
          </Pressable>
          <Text style={[styles.quantityText, { color: color.secondaryText }]}>
            {inCart ? foundProduct.quantity : quantity}
          </Text>
          <Pressable
            style={({ pressed }) => [
              styles.quantityButton,
              { borderColor: pressed ? color.accent : color.secondaryText },
            ]}
            onPress={increaseCartQuantity}
          >
            <Ionicons
              style={{ textAlign: "center" }}
              name="add-outline"
              size={26}
              color={color.secondaryText}
            />
          </Pressable>
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.addButton,
            {
              backgroundColor:
                (isAuthenticated && inCart) || pressed
                  ? color.accent
                  : color.invertedBg,
            },
          ]}
          onPress={
            isAuthenticated
              ? () => addToCart({ id: Number(id), quantity })
              : () => router.push("/user")
          }
          disabled={isAuthenticated && inCart}
        >
          <Text style={[styles.addButtonText, { color: color.invertedText }]}>
            {!isAuthenticated
              ? "login first"
              : inCart
              ? "Already in cart"
              : "Add to cart"}
          </Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    width: width,
    padding: 30,
    gap: 20,
  },
  image: {
    width: "100%",
    height: "40%",
    borderRadius: 10,
  },
  info: {
    gap: 10,
  },
  title: {
    fontFamily: "QuickSandSemi",
    fontSize: 23,
  },
  price: {
    fontFamily: "QuickSandBold",
    fontSize: 30,
  },
  desc: {
    fontFamily: "QuickSandMedium",
    fontSize: 17,
  },
  quantity: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  quantityButton: {
    width: "30%",
    paddingVertical: 14,
    borderWidth: 1,
    borderRadius: 4,
  },
  quantityText: {
    paddingBottom: 5,
    fontFamily: "QuickSandSemi",
    fontSize: 35,
  },
  addButton: {
    padding: 16,
    borderRadius: 4,
  },
  addButtonText: {
    fontFamily: "QuickSandMedium",
    fontSize: 18,
    textAlign: "center",
    textTransform: "uppercase",
  },
});
