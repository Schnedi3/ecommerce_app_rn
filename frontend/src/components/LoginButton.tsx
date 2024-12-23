import { Pressable, StyleSheet, Text, View } from "react-native";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";

import { useThemeColor } from "@/src/hooks/useThemeColor";

export const LoginButton = ({
  onPress,
  iconName,
  buttonText,
}: {
  onPress: () => void;
  iconName: keyof typeof Ionicons.glyphMap;
  buttonText: string;
}): JSX.Element => {
  const { color } = useThemeColor();

  return (
    <Pressable
      style={({ pressed }) => [
        styles.loginButton,
        {
          borderColor: color.border,
          backgroundColor: color.primaryBg,
          opacity: pressed ? 0.5 : 1,
        },
      ]}
      onPress={onPress}
    >
      <View style={styles.continue}>
        <Ionicons name={iconName} size={24} color={color.primaryText} />
        <Text style={[styles.loginButtonText, { color: color.secondaryText }]}>
          {buttonText}
        </Text>
        <FontAwesome6
          name="arrow-right-long"
          style={{ fontSize: 20, color: color.accent }}
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  loginButton: {
    width: "80%",
    paddingVertical: 20,
    paddingHorizontal: 30,
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
  },
  continue: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  loginButtonText: {
    fontFamily: "QuickSandSemi",
    fontSize: 17,
  },
});
