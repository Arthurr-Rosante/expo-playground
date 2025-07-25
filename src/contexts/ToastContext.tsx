import React, { createContext, PropsWithChildren, useState } from "react";
import { StyleSheet, View } from "react-native";
import useTheme from "../hooks/useTheme";
import ThemedText from "../components/ui/ThemedText";

type ToastVariant = "default" | "error" | "warning" | "success";
type ToastPosition = "top" | "bottom";

type ToastOptions = {
  title: string;
  description?: string;
  variant?: ToastVariant;
  position?: ToastPosition;
  duration?: number;
};

type ToastContextType = {
  showToast: (options: ToastOptions) => void;
};

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined
);

export const ToastProvider = ({ children }: PropsWithChildren) => {
  const { theme } = useTheme();
  const [toast, setToast] = useState<ToastOptions | null>(null);

  const showToast = (options: ToastOptions) => {
    const position = options.position || "top";
    const duration = options.duration ?? 3000;

    setToast({
      ...options,
      variant: options.variant || "default",
      position,
      duration,
    });
  };

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
          textColor: theme.background,
        };
    }
  };

  const Toast = () => {
    if (!toast) return null;

    const variantStyles = getVariantStyles(toast.variant);
    const positionStyle =
      toast.position === "bottom" ? styles.bottom : styles.top;

    return (
      <View
        style={[
          styles.container,
          positionStyle,
          {
            backgroundColor: theme.background,
            borderWidth: 2,
            borderColor: variantStyles.textColor,
          },
        ]}
      >
        <View style={{ position: "relative" }}>
          <View
            style={[
              styles.stripe,
              { backgroundColor: variantStyles.textColor },
            ]}
          />
          <ThemedText
            style={[{ color: variantStyles.textColor }]}
            variant="subtitle"
          >
            {toast.title}
          </ThemedText>
          {toast.description && (
            <ThemedText
              style={[{ color: variantStyles.textColor }]}
              variant="body"
            >
              {toast.description}
            </ThemedText>
          )}
        </View>
      </View>
    );
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast />
    </ToastContext.Provider>
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
