import Avatar from "@/src/components/ui/Avatar";
import Button from "@/src/components/ui/Button";
import Container from "@/src/components/ui/Container";
import ThemedText from "@/src/components/ui/ThemedText";
import ThemedView from "@/src/components/ui/ThemedView";
import useAuth from "@/src/hooks/useAuth";
import useToast from "@/src/hooks/useToast";
import { StyleSheet } from "react-native";

export default function HomeTab() {
  const { data, logout } = useAuth();
  const { showToast } = useToast();

  return (
    <Container>
      <ThemedView style={{ alignItems: "center", justifyContent: "center" }}>
        <ThemedText variant="title">~ USER INFO ~</ThemedText>
        <Avatar size={120} source={{ uri: data.user?.pfp }} />
        <ThemedView style={styles.card}>
          <ThemedText>{data.user?.id}</ThemedText>
          <ThemedText>{data.user?.username}</ThemedText>
          <ThemedText>{data.user?.email}</ThemedText>
          <ThemedText>{data.user?.biography}</ThemedText>
        </ThemedView>
      </ThemedView>

      <ThemedView>
        <ThemedText variant="title">~ TOKEN INFO ~</ThemedText>
        <ThemedView style={styles.card}>
          <ThemedText>{data.token}</ThemedText>
        </ThemedView>
      </ThemedView>

      <Button title="LOG OUT" onPress={logout} />
    </Container>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 20,
    padding: 10,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: "#ccc",
  },
});
