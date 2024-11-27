import { StatusBar, useColorScheme } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Colors from "@/src/constants/Colors";

const queryClient = new QueryClient();

export default function RootLayout(): JSX.Element {
  const colorTheme = useColorScheme();
  const color = Colors[colorTheme ?? "light"];

  return (
    <ThemeProvider value={colorTheme === "dark" ? DarkTheme : DefaultTheme}>
      <QueryClientProvider client={queryClient}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="detail/[id]"
            options={{
              headerTitle: "Details",
              headerTitleAlign: "center",
              headerTitleStyle: { color: color.accent },
              animation: "slide_from_right",
            }}
          />
        </Stack>
        <StatusBar
          backgroundColor={color.primaryBg}
          barStyle={colorTheme === "dark" ? "light-content" : "dark-content"}
        />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
