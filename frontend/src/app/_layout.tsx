import { StatusBar, StyleSheet, useColorScheme } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import Colors from "../constants/Colors";

export default function RootLayout(): JSX.Element {
  const colorTheme = useColorScheme();
  const color = Colors[colorTheme ?? "light"];

  return (
    <ThemeProvider value={colorTheme === "dark" ? DarkTheme : DefaultTheme}>
      <SafeAreaView style={styles.container}>
        <Stack>
          <Stack.Screen name="(tabs)" />
        </Stack>
        <StatusBar
          backgroundColor={color.secondaryBg}
          barStyle={colorTheme === "dark" ? "light-content" : "dark-content"}
        />
      </SafeAreaView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
