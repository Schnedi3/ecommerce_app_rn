import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { router } from "expo-router";

import { IProduct } from "@/src/types/types";
import Colors from "@/src/constants/Colors";

const { width } = Dimensions.get("window");

export default function ProductCard({
  product,
}: {
  product: IProduct;
}): JSX.Element {
  const colorTheme = useColorScheme();
  const color = Colors[colorTheme ?? "light"];

  const { id, title, image, price } = product;

  return (
    <Pressable
      style={[
        styles.singleCard,
        {
          borderColor: color.border,
        },
      ]}
      onPress={() =>
        router.push({
          pathname: "/detail/[id]",
          params: { id },
        })
      }
    >
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={[styles.title, { color: color.secondaryText }]}>
          {title}
        </Text>
        <Text style={[styles.price, { color: color.primaryText }]}>
          {price}€
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  singleCard: {
    width: width / 2 - 30,
    height: width * 0.7,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },
  image: {
    width: "100%",
    height: "80%",
    borderRadius: 10,
  },
  info: {
    marginTop: 0,
  },
  title: {
    fontFamily: "QuickSandSemi",
    fontSize: 14,
  },
  price: {
    fontFamily: "QuickSandBold",
    fontSize: 20,
  },
});
