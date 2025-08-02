import useTheme from "@/src/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  const { theme } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.background,
          borderTopWidth: 0,
        },
        tabBarItemStyle: {
          justifyContent: "center",
        },
        tabBarActiveTintColor: theme.accent,
        tabBarInactiveTintColor: theme.foreground,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              size={24}
              name={focused ? "home" : "home-outline"}
              color={focused ? theme.accent : theme.foreground}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: "Notifications",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              size={24}
              name={focused ? "notifications-sharp" : "notifications-outline"}
              color={focused ? theme.accent : theme.foreground}
            />
          ),
        }}
      />
    </Tabs>
  );
}
