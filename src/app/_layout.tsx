import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AuthProvider } from "../contexts/AuthContext";
import useAuth from "../hooks/useAuth";

export default function RootLayout() {
  return (
    <AuthProvider>
      <LayoutContent />
    </AuthProvider>
  );
}

function LayoutContent() {
  const { data } = useAuth();

  return (
    <>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Protected guard={!data.user}>
          <Stack.Screen
            options={{ animation: "simple_push" }}
            name="(auth)/sign-in"
          />
          <Stack.Screen
            options={{ animation: "simple_push" }}
            name="(auth)/sign-up"
          />
        </Stack.Protected>
        <Stack.Protected guard={data.user !== null}>
          <Stack.Screen options={{ animation: "simple_push" }} name="(tabs)" />
        </Stack.Protected>
      </Stack>
    </>
  );
}
