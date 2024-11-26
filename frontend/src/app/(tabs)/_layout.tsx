import { Tabs } from "expo-router";

import CustomTabBar from "@/src/components/CustomTabBar";

export default function TabLayout(): JSX.Element {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="index" options={{ title: "Products" }} />
      <Tabs.Screen name="orders" options={{ title: "Orders" }} />
    </Tabs>
  );
}
