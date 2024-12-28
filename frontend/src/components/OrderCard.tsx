import { Image, StyleSheet, Text, View } from "react-native";

import { useThemeColor } from "@/src/hooks/useThemeColor";
import { IOrderProps } from "@/src/types/types";

export const OrderCard = ({ order }: { order: IOrderProps }) => {
  const { color } = useThemeColor();

  const { created_at, image, price, quantity, title, total_price } = order;

  return (
    <View style={[styles.itemContainer, { borderBottomColor: color.border }]}>
      <Text style={[styles.date, { color: color.disabled }]}>
        {new Date(created_at).toLocaleString()}
      </Text>

      <View style={{ flexDirection: "row", gap: 20, alignItems: "center" }}>
        <Image source={{ uri: image }} style={styles.image} />

        <View>
          <Text style={[styles.title, { color: color.primaryText }]}>
            {title}
          </Text>
          <View style={styles.priceQuantity}>
            <Text style={[styles.price, { color: color.primaryText }]}>
              {price}€
            </Text>
            <Text style={[styles.ex, { color: color.secondaryText }]}>x</Text>
            <Text style={[styles.quantityText, { color: color.secondaryText }]}>
              {quantity}
            </Text>
          </View>
        </View>

        <Text style={[styles.total, { color: color.accent }]}>
          {total_price}€
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    paddingVertical: "3%",
    gap: 10,
    borderBottomWidth: 1,
  },
  date: {
    fontFamily: "QuickSandMedium",
    fontSize: 17,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 4,
  },
  title: {
    width: 250,
    fontFamily: "QuickSandBold",
    fontSize: 16,
  },
  priceQuantity: {
    flexDirection: "row",
    gap: 15,
  },
  price: {
    fontFamily: "QuickSandMedium",
    fontSize: 20,
  },
  ex: {
    fontFamily: "QuickSandMedium",
    fontSize: 20,
  },
  quantityText: {
    paddingBottom: 5,
    fontFamily: "QuickSandMedium",
    fontSize: 20,
  },
  total: {
    fontFamily: "QuickSandBold",
    fontSize: 20,
    marginLeft: "auto",
  },
});
