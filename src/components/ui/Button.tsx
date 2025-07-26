import useTheme from "@/src/hooks/useTheme";
import { Pressable, PressableProps, StyleSheet, Text } from "react-native";

type ButtonProps = PressableProps & {
  title: string;
};

const Button = ({ title, onPress, disabled, ...rest }: ButtonProps) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    button: {
      borderWidth: 1,
      backgroundColor: theme.foreground,
      padding: 12,
      borderRadius: 12,
      marginVertical: 12,
    },
    title: {
      color: theme.background,
      textAlign: "center",
    },
  });

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        disabled && {
          backgroundColor: theme.background,
          borderColor: theme.foreground,
        },
      ]}
      {...rest}
    >
      <Text style={[styles.title, disabled && { color: theme.foreground }]}>
        {title}
      </Text>
    </Pressable>
  );
};

export default Button;
