import { Pressable } from "react-native";
import { Tabs } from "expo-router";

import { useThemeColor } from "@/src/hooks/useThemeColor";
import { CustomTabBarIcon } from "@/src/components/CustomTabBarIcon";

export default function TabLayout(): JSX.Element {
  const { color } = useThemeColor();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        animation: "shift",
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          height: 80,
          backgroundColor: color.primaryBg,
          paddingTop: 23,
          borderTopWidth: 1,
          borderColor: color.border,
          elevation: 0,
        },
        tabBarShowLabel: false,
        tabBarButton: (props) => {
          return (
            <Pressable
              {...props}
              style={{ alignItems: "center" }}
              android_ripple={null}
            />
          );
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => {
            return (
              <CustomTabBarIcon
                focused={focused}
                label="Home"
                iconName="home"
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="user"
        options={{
          title: "User",
          tabBarIcon: ({ focused }) => {
            return (
              <CustomTabBarIcon
                focused={focused}
                label="User"
                iconName="user"
              />
            );
          },
        }}
      />
    </Tabs>
  );
}
