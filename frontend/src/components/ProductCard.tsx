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
        styles.container,
        {
          backgroundColor: color.primaryBg,
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
  container: {
    width: width / 2 - 30,
    borderWidth: 1,
    borderRadius: 10,
    gap: 10,
    padding: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  info: {
    marginTop: 0,
  },
  title: {
    fontSize: 14,
    fontWeight: "400",
  },
  price: {
    fontSize: 20,
    fontWeight: "700",
  },
});
