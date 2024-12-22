import { StatusBar, View } from "react-native";
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

import { tokenCache } from "@/src/lib/token";
import Header from "@/src/components/Header";
import { useThemeColor } from "@/src/hooks/useThemeColor";

const queryClient = new QueryClient();
const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY as string;

export default function InitialLayout(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
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

  const getHeaderTitle = (route: any) => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? "Home";
    switch (routeName) {
      case "index":
        return "Home";
      case "user":
        return "User";
    }
  };

  useFonts({
    QuickSandBold: require("@/assets/fonts/Quicksand-Bold.ttf"),
    QuickSandMedium: require("@/assets/fonts/Quicksand-Medium.ttf"),
    QuickSandSemi: require("@/assets/fonts/Quicksand-SemiBold.ttf"),
  });

  return (
    <ThemeProvider value={colorScheme === "dark" ? MyDarkTheme : MyLightTheme}>
      <View style={{ flex: 1 }}>
        <Stack
          screenOptions={({ route }) => ({
            headerTitle: getHeaderTitle(route),
            headerTitleAlign: "center",
            headerTitleStyle: { fontFamily: "QuickSandBold" },
            headerStyle: { backgroundColor: color.primaryBg },
            animation: "slide_from_right",
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
            options={{ headerTitle: "Details", headerRight: () => <Header /> }}
          />
          <Stack.Screen name="cart" options={{ headerTitle: "Cart" }} />
          <Stack.Screen name="orders" options={{ headerTitle: "Orders" }} />
        </Stack>
      </View>
      <StatusBar
        backgroundColor={color.primaryBg}
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
      />
    </ThemeProvider>
  );
}
