import { Pressable, StyleSheet, Text, View } from "react-native";
import { Tabs } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

import { useThemeColor } from "@/src/hooks/useThemeColor";

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

const CustomTabBarIcon = ({
  focused,
  label,
  iconName,
}: {
  focused: boolean;
  label: string;
  iconName: keyof typeof AntDesign.glyphMap;
}) => {
  const { color } = useThemeColor();

  const size = focused ? 32 : 22;
  const iconColor = focused ? color.accent : color.disabled;
  const display = focused ? "none" : "flex";

  return (
    <View style={styles.container}>
      <AntDesign name={iconName} color={iconColor} size={size} />

      <Text style={[styles.label, { display: display, color: color.disabled }]}>
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontFamily: "QuicksandMedium",
    fontSize: 11,
  },
});
