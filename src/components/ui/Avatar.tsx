import { Image, ImageProps, StyleSheet, useColorScheme } from "react-native";
import { useEffect, useState } from "react";
import Colors from "@/src/constants/colors";

type AvatarProps = ImageProps & {
  size?: number;
  fallback?: ImageProps["source"];
};

const Avatar = ({
  size = 48,
  source,
  fallback = require("@/src/assets/images/icon.png"),
  style,
  ...props
}: AvatarProps) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme as "light" | "dark"] ?? Colors.light;
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
  }, [source]);

  const styles = StyleSheet.create({
    avatar: {
      resizeMode: "cover",
      width: size,
      height: size,
      borderRadius: size / 2,
      borderWidth: 2,
      borderColor: theme.foreground,
    },
  });

  return (
    <Image
      source={error ? fallback : source}
      style={[styles.avatar, style]}
      onError={() => setError(true)}
      {...props}
    />
  );
};

export default Avatar;
