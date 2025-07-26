import { StyleSheet, TextInput, TextInputProps, View } from "react-native";
import useTheme from "@/src/hooks/useTheme";
import { useEffect, useState } from "react";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import ThemedText from "./ThemedText";

type InputProps = TextInputProps & {
  type?: "text" | "email" | "password";
  error?: string;
  icon?: React.ElementType;
};

const Input = ({
  type = "text",
  error,
  icon,
  value,
  onChangeText,
  style: customStyle,
  ...rest
}: InputProps) => {
  const { theme } = useTheme();

  const [focused, setFocused] = useState(false);
  const [showError, setShowError] = useState(!!error);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const translateY = useSharedValue(-10);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (error) {
      setShowError(true);
      translateY.value = withTiming(0, { duration: 250 });
      opacity.value = withTiming(1, { duration: 250 });
    } else {
      translateY.value = withTiming(-10, { duration: 250 });
      opacity.value = withTiming(0, { duration: 250 }, (finished) => {
        if (finished) runOnJS(setShowError)(false);
      });
    }
  }, [error]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  const styles = StyleSheet.create({
    inputWrapper: {
      position: "relative",
      borderBottomWidth: 2,
      marginVertical: 12,
      borderColor: error
        ? theme.ui.error.text
        : focused
        ? theme.primary
        : theme.foreground,
    },
    input: {
      color: theme.text,
    },
    icon: {
      position: "absolute",
      top: 0,
      right: 0,
      padding: 10,
    },
    errorWrapper: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
  });

  return (
    <View>
      <View style={styles.inputWrapper}>
        <TextInput
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholderTextColor={theme.text}
          style={[
            styles.input,
            customStyle,
            type === "password" && { paddingRight: 45 },
          ]}
          keyboardType={type === "email" ? "email-address" : "default"}
          secureTextEntry={type === "password" && !isPasswordVisible}
          value={value}
          onChangeText={onChangeText}
          {...rest}
        />
        {type === "password" && (
          <View style={styles.icon}>
            <Feather
              name={isPasswordVisible ? "eye" : "eye-off"}
              size={22}
              color={focused ? theme.primary : theme.text}
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            />
          </View>
        )}
      </View>

      {showError && (
        <Animated.View style={[styles.errorWrapper, animatedStyle]}>
          <MaterialIcons
            name="error-outline"
            size={18}
            color={theme.ui.error.text}
          />
          <ThemedText variant="small" style={{ color: theme.ui.error.text }}>
            {error}
          </ThemedText>
        </Animated.View>
      )}
    </View>
  );
};

export default Input;
