import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useThemeColor } from "@/src/hooks/useThemeColor";
import { CartWidget } from "@/src/components/CartWidget";

export const HomeHeader = ({
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
        styles.header,
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
        <Text style={[styles.title, { color: color.primaryText }]}>Home</Text>
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
            defaultValue={search}
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

const styles = StyleSheet.create({
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
