import { Image, ImageProps, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import useTheme from "@/src/hooks/useTheme";

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
  const { theme } = useTheme();
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
