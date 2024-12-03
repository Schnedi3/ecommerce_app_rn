import { StatusBar, useColorScheme, View } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { router, Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import { AntDesign } from "@expo/vector-icons";

import Colors from "@/src/constants/Colors";
import { tokenCache } from "@/src/lib/token";

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

  return (
    <Stack
      screenOptions={{ headerStyle: { backgroundColor: color.primaryBg } }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      <Stack.Screen
        name="(tabs)"
        options={{
          headerRight: () => (
            <View style={{ flexDirection: "row", gap: 20 }}>
              <AntDesign
                name="user"
                size={26}
                color={color.secondaryText}
                onPress={() => router.push("/auth")}
              />
            </View>
          ),
        }}
      />

      <Stack.Screen
        name="detail/[id]"
        options={{
          headerTitle: "Details",
          animation: "slide_from_right",
          headerRight: () => (
            <View style={{ flexDirection: "row", gap: 20 }}>
              <AntDesign
                name="user"
                size={26}
                color={color.secondaryText}
                onPress={() => router.push("/auth")}
              />
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="auth"
        options={{
          headerTitle: "Login",
          animation: "slide_from_right",
        }}
      />
    </Stack>
  );
}
