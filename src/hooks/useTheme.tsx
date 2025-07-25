import { useColorScheme } from "react-native";
import Colors from "../constants/colors";

const useTheme = () => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme as "light" | "dark"] ?? Colors.light;
  return { theme };
};

export default useTheme;
