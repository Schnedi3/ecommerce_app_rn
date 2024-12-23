import { StatusBar, View } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import { useFonts } from "expo-font";

import { tokenCache } from "@/src/lib/tokenCache";
import { useThemeColor } from "@/src/hooks/useThemeColor";

const queryClient = new QueryClient();
const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY as string;

export default function InitialLayout(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache()}>
        <ClerkLoaded>
          <RootLayout />
        </ClerkLoaded>
      </ClerkProvider>
    </QueryClientProvider>
  );
}

const MyDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: "#18181b",
  },
};

const MyLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#fff",
  },
};

function RootLayout() {
  const { color, colorScheme } = useThemeColor();

  useFonts({
    QuickSandBold: require("@/assets/fonts/Quicksand-Bold.ttf"),
    QuickSandMedium: require("@/assets/fonts/Quicksand-Medium.ttf"),
    QuickSandSemi: require("@/assets/fonts/Quicksand-SemiBold.ttf"),
  });

  return (
    <ThemeProvider value={colorScheme === "dark" ? MyDarkTheme : MyLightTheme}>
      <View style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen
            name="(modals)/detail/[id]"
            options={{
              headerShown: true,
              animation: "slide_from_bottom",
            }}
          />
          <Stack.Screen
            name="(modals)/cart"
            options={{ presentation: "modal", animation: "slide_from_bottom" }}
          />
          <Stack.Screen
            name="(modals)/orders"
            options={{ presentation: "modal", animation: "slide_from_bottom" }}
          />
        </Stack>
      </View>
      <StatusBar
        backgroundColor={color.primaryBg}
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
      />
    </ThemeProvider>
  );
}
