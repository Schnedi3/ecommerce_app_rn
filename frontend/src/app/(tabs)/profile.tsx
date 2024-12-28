import { useEffect } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useClerk, useOAuth, useUser } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";
import { LinearGradient } from "expo-linear-gradient";
import { Link, router } from "expo-router";

import { useThemeColor } from "@/src/hooks/useThemeColor";
import { useWarmUpBrowser } from "@/src/hooks/useWarmUpBrowser";
import { LoginButton } from "@/src/components/LoginButton";
import { useAuthStore } from "@/src/store/authStore";
import { useSaveUser } from "@/src/api/user";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";

enum Strategy {
  Google = "oauth_google",
  Apple = "oauth_apple",
}

export default function Profile(): JSX.Element {
  useWarmUpBrowser();
  const { color } = useThemeColor();
  const { mutate: saveUser } = useSaveUser();
  const { user } = useUser();
  const { signOut } = useClerk();
  const { isAuthenticated, setIsAuthenticated } = useAuthStore();

  const { startOAuthFlow: googleAuth } = useOAuth({
    strategy: Strategy.Google,
  });
  const { startOAuthFlow: appleAuth } = useOAuth({ strategy: Strategy.Apple });

  const handleLogin = async (social: Strategy) => {
    const selectedStrategy = {
      [Strategy.Google]: googleAuth,
      [Strategy.Apple]: appleAuth,
    }[social];

    try {
      const { createdSessionId, setActive } = await selectedStrategy({
        redirectUrl: Linking.createURL("profile", { scheme: "myapp" }),
      });

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      saveUser({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.emailAddresses[0].emailAddress,
      });
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
        <Image
          source={
            user
              ? { uri: user.imageUrl }
              : require("@/assets/images/avatar.jpg")
          }
          style={styles.bigAvatar}
        />
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
          {user ? user.firstName + " " + user.lastName : "Guest"}
        </Text>
        <Text style={[styles.userEmail, { color: color.primaryText }]}>
          {user ? user.emailAddresses[0].emailAddress : "guest@guest.com"}
        </Text>
      </View>

      {/* footer buttons */}
      <View style={styles.footer}>
        {isAuthenticated ? (
          <View style={{ alignItems: "center", gap: 15 }}>
            <Link
              href="/orders"
              style={[
                styles.orderBtn,
                { borderColor: color.border, backgroundColor: color.primaryBg },
              ]}
              asChild
            >
              <TouchableOpacity activeOpacity={0.5}>
                <View style={styles.orderBtnContent}>
                  <Ionicons
                    name="archive-outline"
                    size={24}
                    color={color.primaryText}
                  />
                  <Text
                    style={[styles.orderBtnTxt, { color: color.secondaryText }]}
                  >
                    Orders
                  </Text>
                  <FontAwesome6
                    name="arrow-right-long"
                    style={{ fontSize: 20, color: color.accent }}
                  />
                </View>
              </TouchableOpacity>
            </Link>

            <LoginButton
              onPress={() => handleLogout()}
              iconName="log-out-outline"
              buttonText="Log out"
            />
          </View>
        ) : (
          <View style={{ gap: 15 }}>
            <LoginButton
              onPress={() => handleLogin(Strategy.Google)}
              iconName="logo-google"
              buttonText="Continue with Google"
            />

            <LoginButton
              onPress={() => handleLogin(Strategy.Apple)}
              iconName="logo-apple"
              buttonText="Continue with Apple"
            />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 40,
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
  // userInfo
  userInfo: {
    top: 170,
    alignItems: "center",
    gap: 5,
  },
  avatar: {
    width: 150,
    height: 150,
    borderWidth: 2,
    borderRadius: 100,
  },
  userName: {
    fontFamily: "QuickSandBold",
    fontSize: 30,
  },
  userEmail: {
    fontFamily: "QuickSandMedium",
    fontSize: 16,
  },
  // footer
  footer: {
    top: 300,
    alignItems: "center",
  },
  // orders
  orderBtn: {
    width: "80%",
    paddingVertical: 20,
    paddingHorizontal: 30,
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
  },
  orderBtnContent: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  orderBtnTxt: {
    fontFamily: "QuickSandSemi",
    fontSize: 17,
  },
});
