import Colors from "@/src/constants/colors";
import { StyleSheet, useColorScheme, View, ViewProps } from "react-native";

type ThemedViewProps = ViewProps & {};

const ThemedView = ({ children, style, ...rest }: ThemedViewProps) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme as "light" | "dark"] ?? Colors.light;

  const styles = StyleSheet.create({
    view: {
      backgroundColor: theme.background,
      color: theme.foreground,
    },
  });

  return (
    <View style={[styles.view, style]} {...rest}>
      {children}
    </View>
  );
};

export default ThemedView;
