import { useColorScheme } from "react-native";

import { darkColors, lightColors } from "@/src/constants/Colors";

export const useThemeColor = () => {
  const colorScheme = useColorScheme();
  const color = colorScheme === "dark" ? darkColors : lightColors;

  return { color, colorScheme };
};
