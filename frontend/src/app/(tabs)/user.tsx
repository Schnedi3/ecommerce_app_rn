import { useCallback, useEffect } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useClerk, useOAuth, useUser } from "@clerk/clerk-expo";
import { Link, router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

import { googleOAuth } from "@/src/lib/oauth";
import { useSaveUser } from "@/src/api/auth";
import { useAuthStore } from "@/src/store/authStore";
import { useThemeColor } from "@/src/hooks/useThemeColor";

export default function user(): JSX.Element {
  const { color } = useThemeColor();

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
      <LinearGradient colors={["#c54497", "#403999"]} style={styles.header}>
        {user && (
          <Image source={{ uri: user.imageUrl }} style={styles.bigAvatar} />
        )}
      </LinearGradient>

      <View style={styles.userInfo}>
        <Image
          source={
            user
              ? { uri: user.imageUrl }
              : require("@/assets/images/avatar.jpg")
          }
          style={[styles.avatar, { borderColor: color.primaryBg }]}
        />
        <Text style={[styles.userName, { color: color.primaryText }]}>
          {user ? user.firstName : "Guest"}
        </Text>
        <Text
          style={[
            styles.userEmail,
            { color: color.primaryText, backgroundColor: color.primaryBg },
          ]}
        >
          {user ? user.emailAddresses[0].emailAddress : "guest@guest.com"}
        </Text>
      </View>

      <View style={styles.buttonsContainer}>
        {isAuthenticated && (
          <Link
            href="/orders"
            style={[styles.button, { borderColor: color.border }]}
            asChild
          >
            <Pressable>
              <Ionicons
                size={26}
                name="archive-outline"
                color={color.secondaryText}
              />
              <Text style={[styles.buttonText, { color: color.secondaryText }]}>
                Orders
              </Text>
            </Pressable>
          </Link>
        )}
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && { backgroundColor: color.primaryBg },
            { borderColor: color.border },
          ]}
          onPress={isAuthenticated ? handleLogout : handleLogin}
        >
          <AntDesign
            size={24}
            name={isAuthenticated ? "logout" : "google"}
            color={color.secondaryText}
          />
          <Text style={[styles.buttonText, { color: color.secondaryText }]}>
            {isAuthenticated ? "Logout" : "Login with Google"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: "absolute",
    width: "100%",
    height: 300,
    opacity: 0.75,
  },
  bigAvatar: {
    width: "100%",
    height: 300,
    zIndex: -1,
  },
  userInfo: {
    top: 170,
    alignItems: "center",
    gap: 5,
  },
  avatar: {
    width: 150,
    height: 150,
    borderWidth: 5,
    borderRadius: 100,
  },
  userName: {
    fontFamily: "QuickSandBold",
    fontSize: 20,
  },
  userEmail: {
    paddingHorizontal: 20,
    paddingTop: 3,
    paddingBottom: 6,
    fontFamily: "QuickSandMedium",
    fontSize: 16,
    borderRadius: 20,
    elevation: 3,
  },
  buttonsContainer: {
    top: 250,
  },
  button: {
    paddingHorizontal: 80,
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 40,
    borderBottomWidth: 1,
  },
  buttonText: {
    fontFamily: "QuickSandMedium",
    fontSize: 20,
  },
});
