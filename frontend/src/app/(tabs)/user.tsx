import { useCallback, useEffect } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useClerk, useOAuth, useUser } from "@clerk/clerk-expo";

import Colors from "@/src/constants/Colors";
import { googleOAuth } from "@/src/lib/oauth";
import { useSaveUser } from "@/src/api/auth";
import { useAuthStore } from "@/src/store/authStore";
import { router } from "expo-router";

export default function user(): JSX.Element {
  const colorTheme = useColorScheme();
  const color = Colors[colorTheme ?? "light"];

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const { user } = useUser();
  const { signOut } = useClerk();
  const { mutate: saveUser } = useSaveUser();
  const { isAuthenticated, setIsAuthenticated } = useAuthStore();

  const handleLogin = useCallback(async () => {
    try {
      await googleOAuth(startOAuthFlow);
    } catch (err) {
      console.error(`OAuth error: ${err}`);
    }
  }, []);

  useEffect(() => {
    if (user) {
      saveUser({
        id: user.id,
        name: user.firstName,
        email: user.emailAddresses[0].emailAddress,
      });
      setIsAuthenticated(true);
    }
  }, [user]);

  const handleLogout = () => {
    signOut();
    setIsAuthenticated(false);
    router.replace("/");
  };

  return (
    <View style={[styles.container, { backgroundColor: color.secondaryBg }]}>
      {user && (
        <View style={styles.userInfo}>
          <Image source={{ uri: user.imageUrl }} style={styles.avatar} />
          <Text style={[styles.userText, { color: color.primaryText }]}>
            {user.firstName}
          </Text>
          <Text style={[styles.userText, { color: color.primaryText }]}>
            {user.emailAddresses[0].emailAddress}
          </Text>
        </View>
      )}

      <Pressable
        style={({ pressed }) => [
          styles.loginButton,
          { backgroundColor: color.invertedBg },
          pressed && { backgroundColor: color.accent },
        ]}
        onPress={isAuthenticated ? handleLogout : handleLogin}
      >
        <AntDesign size={28} name="google" color={color.invertedText} />
        <Text style={[styles.loginText, { color: color.invertedText }]}>
          {isAuthenticated ? "Logout" : "Login with Google"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loginButton: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
    borderRadius: 4,
  },
  loginText: {
    fontFamily: "QuickSandMedium",
    fontSize: 20,
  },
  userInfo: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  userText: {
    fontFamily: "MulishBold",
    fontSize: 20,
  },
});
