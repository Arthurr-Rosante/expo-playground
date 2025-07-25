import Colors from "@/src/constants/colors";
import useTheme from "@/src/hooks/useTheme";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

type InputProps = TextInputProps & {
  placeholder?: string;
  error?: string;
  icon?: React.ElementType;
};

const Input = ({
  placeholder,
  error,
  icon,
  value,
  onChangeText,
  style,
  ...rest
}: InputProps) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    wrapper: {},
    input: {
      color: theme.foreground,
      backgroundColor: theme.background,
      borderWidth: 1,
      borderColor: theme.foreground,
      borderRadius: 12,
      padding: 12,
      marginVertical: 6,
    },
    error: {
      color: theme.ui.error,
    },
  });

  return (
    <View style={styles.wrapper}>
      <TextInput
        value={value}
        placeholderTextColor={theme.foreground}
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={[styles.input, style]}
        {...rest}
      />
      {error && <Text style={styles.error}></Text>}
    </View>
  );
};

export default Input;
