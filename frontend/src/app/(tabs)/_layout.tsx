import { Button, useColorScheme } from "react-native";
import { Tabs } from "expo-router";

import CustomTabBar from "@/src/components/CustomTabBar";
import Colors from "@/src/constants/Colors";

export default function TabLayout(): JSX.Element {
  const colorTheme = useColorScheme();
  const color = Colors[colorTheme ?? "light"];

  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerTitleAlign: "center",
        headerStyle: { backgroundColor: color.primaryBg },
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Products" }} />
      <Tabs.Screen name="orders" options={{ title: "Orders" }} />
    </Tabs>
  );
}
