import useTheme from "@/src/hooks/useTheme";
import { StyleSheet, View, ViewProps } from "react-native";

type ThemedViewProps = ViewProps & {};

const ThemedView = ({ children, style, ...rest }: ThemedViewProps) => {
  const { theme } = useTheme();

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
