import Colors from "@/src/constants/colors";
import TextConfigs from "@/src/constants/text";
import { StyleSheet, Text, TextProps, useColorScheme } from "react-native";

type ThemedTextProps = TextProps & {
  variant?: "title" | "subtitle" | "body" | "small" | "xsmall";
};

const ThemedText = ({
  variant = "body",
  children,
  style,
  ...rest
}: ThemedTextProps) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme as "light" | "dark"] ?? Colors.light;

  const styles = StyleSheet.create({
    text: {
      color: theme.foreground,
      fontSize: TextConfigs[variant].fontSize,
      lineHeight: TextConfigs[variant].lineHeight,
      fontWeight: variant === "title" || variant === "subtitle" ? "800" : "400",
    },
  });

  return (
    <Text style={[styles.text, style]} {...rest}>
      {children}
    </Text>
  );
};

export default ThemedText;
