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
          height: 70,
          backgroundColor: color.primaryBg,
          paddingTop: 15,
          borderTopWidth: 1,
          borderColor: color.border,
          elevation: 0,
        },
        tabBarShowLabel: false,
        tabBarButton: (props) => {
          return <Pressable {...props} android_ripple={null} />;
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
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => {
            return (
              <CustomTabBarIcon
                focused={focused}
                label="Profile"
                iconName="user"
              />
            );
          },
        }}
      />
    </Tabs>
  );
}
