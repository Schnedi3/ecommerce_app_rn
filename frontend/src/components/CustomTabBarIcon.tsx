import { StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { useThemeColor } from "@/src/hooks/useThemeColor";

export const CustomTabBarIcon = ({
  focused,
  label,
  iconName,
}: {
  focused: boolean;
  label: string;
  iconName: keyof typeof AntDesign.glyphMap;
}) => {
  const { color } = useThemeColor();

  const size = focused ? 36 : 26;
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
    fontSize: 12,
  },
});
