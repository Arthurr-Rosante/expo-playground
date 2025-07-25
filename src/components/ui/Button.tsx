import Colors from "@/src/constants/colors";
import {
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  useColorScheme,
} from "react-native";

type ButtonProps = PressableProps & {
  title: string;
};

const Button = ({ title, onPress, ...rest }: ButtonProps) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme as "light" | "dark"] ?? Colors.light;

  const styles = StyleSheet.create({
    button: {
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
    <Pressable onPress={onPress} style={[styles.button]} {...rest}>
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
};

export default Button;
