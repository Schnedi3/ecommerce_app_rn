import { StatusBar, useColorScheme } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  getFocusedRouteNameFromRoute,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import { useFonts } from "expo-font";

import Colors from "@/src/constants/Colors";
import { tokenCache } from "@/src/lib/token";
import { useAuthStore } from "@/src/store/authStore";
import Header from "@/src/components/Header";

const queryClient = new QueryClient();
const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY as string;

export default function ClerkLayout(): JSX.Element {
  const colorTheme = useColorScheme();
  const color = Colors[colorTheme ?? "light"];

  return (
    <ThemeProvider value={colorTheme === "dark" ? DarkTheme : DefaultTheme}>
      <QueryClientProvider client={queryClient}>
        <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
          <ClerkLoaded>
            <RootLayout />
          </ClerkLoaded>
        </ClerkProvider>
        <StatusBar
          backgroundColor={color.primaryBg}
          barStyle={colorTheme === "dark" ? "light-content" : "dark-content"}
        />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

function RootLayout() {
  const colorTheme = useColorScheme();
  const color = Colors[colorTheme ?? "light"];

  const { isAuthenticated } = useAuthStore();

  const getHeaderTitle = (route: any) => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? "Home";
    switch (routeName) {
      case "index":
        return "Home";
      case "orders":
        return "Orders";
      case "cart":
        return "Cart";
      case "auth":
        return "Login";
    }
  };

  useFonts({
    QuickSandBold: require("@/assets/fonts/Quicksand-Bold.ttf"),
    QuickSandMedium: require("@/assets/fonts/Quicksand-Medium.ttf"),
    QuickSandSemi: require("@/assets/fonts/Quicksand-SemiBold.ttf"),
  });

  return (
    <Stack
      screenOptions={({ route }) => ({
        headerTitle: getHeaderTitle(route),
        headerTitleAlign: "center",
        headerTitleStyle: { fontFamily: "QuickSandBold" },
        headerStyle: { backgroundColor: color.primaryBg },
      })}
    >
      <Stack.Screen
        name="(tabs)"
        options={{
          headerTitleAlign: "left",
          headerRight: () => <Header />,
        }}
      />

      <Stack.Screen
        name="detail/[id]"
        options={{
          headerTitle: "Details",
          animation: "slide_from_right",
          headerRight: () => <Header />,
        }}
      />
      <Stack.Screen
        name="auth"
        options={{
          headerTitle: "Login",
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="cart"
        options={{
          headerTitle: "Cart",
          animation: "slide_from_right",
        }}
      />
    </Stack>
  );
}
