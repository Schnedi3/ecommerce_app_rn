import { FlatList, StyleSheet, Text, View } from "react-native";
import { Stack } from "expo-router";

import { useGetUserOrders } from "@/src/api/order";
import { OrderCard } from "@/src/components/OrderCard";
import { useThemeColor } from "@/src/hooks/useThemeColor";
import { IOrderProps } from "@/src/types/types";

export default function Orders(): JSX.Element {
  const { color } = useThemeColor();
  const { data: orders } = useGetUserOrders();

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          header: () => <OrderHeader />,
        }}
      />

      {!orders || orders.length === 0 ? (
        <View
          style={[styles.container, { backgroundColor: color.secondaryBg }]}
        >
          <Text style={[styles.title, { color: color.primaryText }]}>
            Orders
          </Text>
        </View>
      ) : (
        <FlatList
          style={{ backgroundColor: color.secondaryBg }}
          contentContainerStyle={styles.ordersContainer}
          data={orders as IOrderProps[]}
          renderItem={({ item }) => <OrderCard order={item} />}
        />
      )}
    </>
  );
}

const OrderHeader = () => {
  const { color } = useThemeColor();

  return (
    <View
      style={[
        headerStyles.header,
        { borderBottomColor: color.border, backgroundColor: color.primaryBg },
      ]}
    >
      <Text style={[headerStyles.title, { color: color.primaryText }]}>
        Orders
      </Text>
    </View>
  );
};

const headerStyles = StyleSheet.create({
  header: {
    height: 50,
    paddingHorizontal: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
  },
  title: {
    fontFamily: "QuickSandBold",
    fontSize: 20,
  },
});

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
    paddingHorizontal: 25,
  },
});
