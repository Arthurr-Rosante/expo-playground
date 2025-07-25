import Colors from "@/src/constants/colors";
import { ViewStyle, ViewProps, View, useColorScheme } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type ContainerProps = ViewProps & {
  safeVertical?: boolean;
  safeHorizontal?: boolean;
};

const Container = ({
  children,
  style,
  safeVertical = true,
  safeHorizontal = true,
  ...rest
}: ContainerProps) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme as "light" | "dark"] ?? Colors.light;
  const insets = useSafeAreaInsets();

  const safeStyle: ViewStyle = {
    paddingTop: safeVertical ? insets.top : 0,
    paddingBottom: safeVertical ? insets.bottom : 0,
    paddingLeft: safeHorizontal ? insets.left : 0,
    paddingRight: safeHorizontal ? insets.right : 0,
    flex: 1,
    backgroundColor: theme.background,
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <View style={[safeStyle, style]} {...rest}>
      {children}
    </View>
  );
};

export default Container;
