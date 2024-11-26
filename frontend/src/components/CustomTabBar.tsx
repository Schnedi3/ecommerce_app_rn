import { StyleSheet, Text, useColorScheme, View } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

import Colors from "@/src/constants/Colors";
import TabBarButton from "./TabBarButton";

export default function CustomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps): JSX.Element {
  const colorTheme = useColorScheme();
  const color = Colors[colorTheme ?? "light"];

  return (
    <View style={[styles.tabBar, { backgroundColor: color.secondaryBg }]}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        return (
          <TabBarButton
            key={index}
            onPress={onPress}
            isFocused={isFocused}
            label={label}
            routeName={route.name}
            props
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    paddingVertical: 14,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
});
