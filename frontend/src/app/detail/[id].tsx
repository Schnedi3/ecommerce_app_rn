import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { useLocalSearchParams } from "expo-router";

import Colors from "@/src/constants/Colors";
import { useGetProduct } from "@/src/api/product";

const { width } = Dimensions.get("window");

export default function Detail(): JSX.Element {
  const colorTheme = useColorScheme();
  const color = Colors[colorTheme ?? "light"];

  const { id } = useLocalSearchParams();
  const { data: product } = useGetProduct(Number(id));

  if (!product) {
    return (
      <View style={[styles.loading, { backgroundColor: color.secondaryBg }]}>
        <ActivityIndicator size="large" color={color.accent} />
      </View>
    );
  }
  const { title, description, image, price } = product;

  return (
    <View style={[styles.container, { backgroundColor: color.secondaryBg }]}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={[styles.title, { color: color.primaryText }]}>
          {title}
        </Text>
        <Text style={[styles.desc, { color: color.secondaryText }]}>
          {description}
        </Text>
        <Text style={[styles.price, { color: color.accent }]}>{price}€</Text>
      </View>
    </View>
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
    fontSize: 23,
    fontWeight: "700",
  },
  desc: {
    fontSize: 17,
    fontWeight: "400",
  },
  price: {
    fontSize: 30,
    fontWeight: "900",
  },
});
