import { StyleSheet, Text, useColorScheme, View } from "react-native";

import Colors from "@/src/constants/Colors";

export default function Orders(): JSX.Element {
  const colorTheme = useColorScheme();
  const color = Colors[colorTheme ?? "light"];

  return (
    <View style={[styles.container, { backgroundColor: color.secondaryBg }]}>
      <Text style={styles.title}>Orders</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 60,
    fontWeight: "bold",
    opacity: 0.35,
  },
});
