import { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useClerk, useOAuth, useUser } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";
import { LinearGradient } from "expo-linear-gradient";
import { Link, router } from "expo-router";

import { useThemeColor } from "@/src/hooks/useThemeColor";
import { useWarmUpBrowser } from "@/src/hooks/useWarmUpBrowser";
import { LoginButton } from "@/src/components/LoginButton";
import { useAuthStore } from "@/src/store/authStore";
import { useSaveUser } from "@/src/api/auth";

enum Strategy {
  Google = "oauth_google",
  Apple = "oauth_apple",
  Facebook = "oauth_facebook",
}

export default function User(): JSX.Element {
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
  const { startOAuthFlow: facebookAuth } = useOAuth({
    strategy: Strategy.Facebook,
  });

  const handleLogin = async (social: Strategy) => {
    const selectedStrategy = {
      [Strategy.Google]: googleAuth,
      [Strategy.Apple]: appleAuth,
      [Strategy.Facebook]: facebookAuth,
    }[social];

    try {
      const { createdSessionId, setActive } = await selectedStrategy({
        redirectUrl: Linking.createURL("user", { scheme: "myapp" }),
      });

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      saveUser({
        id: user.id,
        name: user.firstName,
        email: user.emailAddresses[0].emailAddress,
      });
    }
  }, []);

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
          {user ? user.firstName : "Guest"}
        </Text>
        <Text
          style={[
            styles.userEmail,
            {
              color: color.primaryText,
              backgroundColor: color.primaryBg,
              borderColor: color.border,
            },
          ]}
        >
          {user ? user.emailAddresses[0].emailAddress : "guest@guest.com"}
        </Text>
      </View>

      {/* footer buttons */}
      <View style={styles.footer}>
        {isAuthenticated ? (
          <View style={{ gap: 15 }}>
            <Link
              href="/orders"
              style={[
                styles.orderBtn,
                { borderColor: color.border, backgroundColor: color.primaryBg },
              ]}
              asChild
            >
              <LoginButton iconName="archive-outline" buttonText="Orders" />
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

            <LoginButton
              onPress={() => handleLogin(Strategy.Facebook)}
              iconName="logo-facebook"
              buttonText="Continue with Facebook"
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
  // login
  footer: {
    top: 250,
    alignItems: "center",
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
    fontSize: 20,
  },
  userEmail: {
    paddingHorizontal: 20,
    paddingTop: 3,
    paddingBottom: 6,
    fontFamily: "QuickSandMedium",
    fontSize: 16,
    borderRadius: 20,
    borderWidth: 1,
  },
  // order
  orderBtn: {
    width: "80%",
    paddingVertical: 20,
    paddingHorizontal: 30,
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
  },
  ordenBtnContent: {
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
