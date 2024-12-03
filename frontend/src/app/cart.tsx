import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

import Colors from "@/src/constants/Colors";
import { useGetCart } from "@/src/api/cart";

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
          renderItem={({ item: { title, image, price, quantity } }) => (
            <View
              style={[
                styles.itemContainer,
                { borderBottomColor: color.border },
              ]}
            >
              <Image source={{ uri: image }} style={styles.image} />

              <View style={styles.titlePrice}>
                <Text style={[styles.title, { color: color.secondaryText }]}>
                  {title}
                </Text>
                <Text style={[styles.price, { color: color.accent }]}>
                  {price}€
                </Text>
              </View>

              <View style={styles.quantity}>
                <Pressable>
                  <AntDesign
                    name="minuscircleo"
                    size={20}
                    color={color.secondaryText}
                  />
                </Pressable>
                <Text
                  style={[styles.quantityText, { color: color.secondaryText }]}
                >
                  {quantity}
                </Text>
                <Pressable>
                  <AntDesign
                    name="pluscircleo"
                    size={20}
                    color={color.secondaryText}
                  />
                </Pressable>
              </View>
            </View>
          )}
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
  itemContainer: {
    width: "90%",
    marginHorizontal: "auto",
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 4,
  },
  titlePrice: {
    gap: 5,
  },
  title: {
    fontFamily: "QuickSandSemi",
    fontSize: 18,
  },
  price: {
    fontFamily: "QuickSandBold",
    fontSize: 22,
  },
  quantity: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  quantityText: {
    paddingBottom: 5,
    fontFamily: "QuickSandSemi",
    fontSize: 20,
  },
  checkout: {
    width: "90%",
    marginHorizontal: "auto",
    marginTop: 15,
    padding: 16,
    borderRadius: 4,
  },
  checkoutText: {
    fontFamily: "QuickMedium",
    fontSize: 18,
    textAlign: "center",
    textTransform: "uppercase",
  },
});
