import { useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Link, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { useGetProducts } from "@/src/api/product";
import { ProductCard } from "@/src/components/ProductCard";
import { useThemeColor } from "@/src/hooks/useThemeColor";
import { CartWidget } from "@/src/components/CartWidget";
import { IProduct } from "@/src/types/types";

export default function Home(): JSX.Element {
  const [search, setSearch] = useState<string>("");
  const { color } = useThemeColor();
  const { data: products } = useGetProducts();

  const filteredProducts = useMemo(() => {
    let filtered = products as IProduct[];

    if (search) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    return filtered;
  }, [products, search]);

  if (!products) {
    return (
      <View style={[styles.loading, { backgroundColor: color.secondaryBg }]}>
        <ActivityIndicator size="large" color={color.accent} />
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          header: () => <HomeHeader search={search} setSearch={setSearch} />,
        }}
      />

      <FlatList
        contentContainerStyle={[
          styles.contentContainer,
          { backgroundColor: color.secondaryBg },
        ]}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        data={filteredProducts as IProduct[]}
        numColumns={2}
        renderItem={({ item }) => (
          <Link href={`/detail/${item.id}`} asChild>
            <TouchableOpacity activeOpacity={0.5}>
              <ProductCard product={item} />
            </TouchableOpacity>
          </Link>
        )}
      />
    </>
  );
}

const HomeHeader = ({
  search,
  setSearch,
}: {
  search: string;
  setSearch: (search: string) => void;
}): JSX.Element => {
  const [visibleSearch, setVisibleSearch] = useState<boolean>(false);
  const { color } = useThemeColor();

  return (
    <View
      style={[
        headerStyles.header,
        {
          borderColor: color.border,
          backgroundColor: color.primaryBg,
        },
      ]}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={[headerStyles.title, { color: color.primaryText }]}>
          Home
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 15 }}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => setVisibleSearch(!visibleSearch)}
          >
            <Ionicons
              name="search-outline"
              size={24}
              color={color.primaryText}
            />
          </TouchableOpacity>
          <CartWidget />
        </View>
      </View>

      {visibleSearch && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 15,
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderWidth: 1,
            borderRadius: 40,
            borderColor: color.disabled,
          }}
        >
          <Ionicons name="search-outline" size={24} color={color.primaryText} />
          <TextInput
            style={{ flex: 1, color: color.primaryText }}
            placeholder="Search for a product..."
            placeholderTextColor={color.disabled}
            value={search}
            onChangeText={(text) => setSearch(text)}
          />
          <Ionicons
            name="close-outline"
            style={{
              fontSize: 24,
              color: color.secondaryText,
              marginLeft: "auto",
            }}
            onPress={() => setSearch("")}
          />
        </View>
      )}
    </View>
  );
};

const headerStyles = StyleSheet.create({
  header: {
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  title: {
    fontFamily: "QuickSandBold",
    fontSize: 20,
  },
});

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    minHeight: "100%",
    padding: 20,
    gap: 20,
  },
});
