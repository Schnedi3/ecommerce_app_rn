import { FlatList, StyleSheet, Text, View } from "react-native";

import { useGetUserOrders } from "@/src/api/order";
import { OrderCard } from "@/src/components/OrderCard";
import { useThemeColor } from "@/src/hooks/useThemeColor";
import { Stack } from "expo-router";
import { CustomHeader } from "@/src/components/CustomHeader";

export default function Orders(): JSX.Element {
  const { color } = useThemeColor();

  const { data: orders } = useGetUserOrders();

  if (!orders || orders.length === 0) {
    return (
      <View style={[styles.container, { backgroundColor: color.secondaryBg }]}>
        <Text style={[styles.title, { color: color.primaryText }]}>Orders</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          header: () => <CustomHeader title="Orders" />,
        }}
      />

      <FlatList
        style={{ backgroundColor: color.secondaryBg }}
        contentContainerStyle={styles.ordersContainer}
        data={orders}
        renderItem={({ item }) => <OrderCard order={item} />}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: "QuickSandBold",
    fontSize: 60,
    opacity: 0.35,
  },
  ordersContainer: {
    paddingHorizontal: "5%",
  },
});
