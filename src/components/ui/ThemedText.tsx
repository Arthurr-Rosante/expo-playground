import TextConfigs from "@/src/constants/text";
import useTheme from "@/src/hooks/useTheme";
import { StyleSheet, Text, TextProps } from "react-native";

type ThemedTextProps = TextProps & {
  variant?: "title" | "subtitle" | "body" | "small" | "xsmall";
};

const ThemedText = ({
  variant = "body",
  children,
  style,
  ...rest
}: ThemedTextProps) => {
  const { theme } = useTheme();

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
