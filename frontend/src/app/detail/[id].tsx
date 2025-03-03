import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { useGetProduct } from "@/src/api/product";
import { useAddToCart, useGetCart } from "@/src/api/cart";
import { ICartItem } from "@/src/types/types";
import { useAuthStore } from "@/src/store/authStore";
import { useThemeColor } from "@/src/hooks/useThemeColor";
import { CartWidget } from "@/src/components/CartWidget";

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

  const handleAddToCart = () => {
    addToCart({ id: Number(id), quantity });
    setQuantity(1);
  };

  if (!product) {
    return (
      <View style={[styles.loading, { backgroundColor: color.secondaryBg }]}>
        <ActivityIndicator size="large" color={color.secondaryText} />
      </View>
    );
  }
  const { title, description, image, price } = product;

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          header: () => <DetailHeader title={title} />,
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

        <View style={styles.footer}>
          <View style={styles.quantity}>
            <Pressable
              style={({ pressed }) => [
                styles.quantityButton,
                {
                  opacity: pressed ? 0.5 : 1,
                  backgroundColor: color.border,
                  borderBottomLeftRadius: 20,
                },
              ]}
              onPress={decreaseCartQuantity}
              disabled={quantity === 1}
            >
              <Ionicons
                name="remove-outline"
                style={[styles.quantityIcon, { color: color.secondaryText }]}
              />
            </Pressable>
            <Text
              style={[
                styles.quantityText,
                { color: color.secondaryText, borderColor: color.border },
              ]}
            >
              {inCart ? foundProduct.quantity : quantity}
            </Text>
            <Pressable
              style={({ pressed }) => [
                styles.quantityButton,
                { opacity: pressed ? 0.5 : 1, backgroundColor: color.border },
              ]}
              onPress={increaseCartQuantity}
              disabled={!isAuthenticated}
            >
              <Ionicons
                name="add-outline"
                style={[styles.quantityIcon, { color: color.secondaryText }]}
              />
            </Pressable>
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.addButton,
              {
                backgroundColor:
                  pressed || inCart ? color.accent : color.invertedBg,
              },
            ]}
            onPress={
              isAuthenticated ? handleAddToCart : () => router.push("/profile")
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
      </View>
    </>
  );
}

const DetailHeader = ({ title }: { title: string }): JSX.Element => {
  const { color } = useThemeColor();

  return (
    <View
      style={[
        headerStyles.header,
        {
          borderColor: color.border,
          backgroundColor: color.primaryBg,
        },
      ]}
    >
      <Text style={[headerStyles.title, { color: color.primaryText }]}>
        {title ? title : "Loading..."}
      </Text>
      <CartWidget />
    </View>
  );
};

const headerStyles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  title: {
    fontFamily: "QuickSandBold",
    fontSize: 20,
  },
});

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    width: "100%",
    gap: 20,
  },
  image: {
    width: "100%",
    height: "40%",
  },
  info: {
    gap: 5,
    paddingHorizontal: 26,
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
  // footer
  footer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginTop: "auto",
    paddingBottom: 30,
  },
  // quantity
  quantity: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  quantityButton: {
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  quantityIcon: {
    fontSize: 25,
    textAlign: "center",
  },
  quantityText: {
    paddingVertical: 9,
    paddingHorizontal: 32,
    fontFamily: "QuickSandSemi",
    fontSize: 25,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  // add to cart
  addButton: {
    flex: 1,
    padding: 16,
    borderBottomRightRadius: 20,
  },
  addButtonText: {
    fontFamily: "QuickSandMedium",
    fontSize: 16,
    textAlign: "center",
    textTransform: "uppercase",
  },
});
