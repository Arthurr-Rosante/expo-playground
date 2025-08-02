import { StyleSheet, View } from "react-native";
import ThemedText from "../ThemedText";
import useTheme from "@/src/hooks/useTheme";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  runOnJS,
} from "react-native-reanimated";
import { useEffect } from "react";

type ToastVariant = "default" | "error" | "warning" | "success";
type ToastPosition = "top" | "bottom";

export type ToastOptions = {
  title: string;
  description?: string;
  variant?: ToastVariant;
  position?: ToastPosition;
  duration?: number;
  onClose?: () => void;
};

export const Toast = (toast: ToastOptions) => {
  const { theme } = useTheme();

  const translateY = useSharedValue(toast.position === "bottom" ? 100 : -100);
  const opacity = useSharedValue(0);

  const getVariantStyles = (variant: ToastVariant = "default") => {
    switch (variant) {
      case "error":
        return {
          backgroundColor: theme.ui.error.background,
          textColor: theme.ui.error.text,
        };
      case "warning":
        return {
          backgroundColor: theme.ui.warning.background,
          textColor: theme.ui.warning.text,
        };
      case "success":
        return {
          backgroundColor: theme.ui.success.background,
          textColor: theme.ui.success.text,
        };
      default:
        return {
          backgroundColor: theme.foreground,
          textColor: theme.foreground,
        };
    }
  };

  const variantStyles = getVariantStyles(toast.variant);
  const positionStyle =
    toast.position === "bottom" ? styles.bottom : styles.top;

  useEffect(() => {
    // Entrada
    translateY.value = withTiming(0, {
      duration: 300,
      easing: Easing.out(Easing.ease),
    });
    opacity.value = withTiming(1, {
      duration: 300,
      easing: Easing.out(Easing.ease),
    });

    const timeout = setTimeout(() => {
      // Saída
      translateY.value = withTiming(toast.position === "bottom" ? 100 : -100, {
        duration: 300,
        easing: Easing.in(Easing.ease),
      });
      opacity.value = withTiming(
        0,
        {
          duration: 300,
          easing: Easing.in(Easing.ease),
        },
        (finished) => {
          if (finished && toast.onClose) runOnJS(toast.onClose)();
        }
      );
    }, toast.duration ?? 3000);

    return () => clearTimeout(timeout);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        styles.container,
        positionStyle,
        animatedStyle,
        {
          backgroundColor: theme.background,
          borderWidth: 2,
          borderColor: variantStyles.textColor,
        },
      ]}
    >
      <View style={{ position: "relative" }}>
        <View
          style={[styles.stripe, { backgroundColor: variantStyles.textColor }]}
        />
        <ThemedText
          style={{ color: variantStyles.textColor }}
          variant="subtitle"
        >
          {toast.title}
        </ThemedText>
        {toast.description && (
          <ThemedText style={{ color: variantStyles.textColor }} variant="body">
            {toast.description}
          </ThemedText>
        )}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    position: "absolute",
    left: 16,
    right: 16,
    borderRadius: 8,
    padding: 12,
    paddingLeft: 24,
    zIndex: 999,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  top: {
    top: 50,
  },
  bottom: {
    bottom: 50,
  },
  stripe: {
    position: "absolute",
    width: 12,
    height: 100,
    top: -25,
    left: -30,
  },
});
