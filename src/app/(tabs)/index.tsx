import Avatar from "@/src/components/ui/Avatar";
import Button from "@/src/components/ui/Button";
import Container from "@/src/components/ui/Container";
import ThemedText from "@/src/components/ui/ThemedText";
import ThemedView from "@/src/components/ui/ThemedView";
import useAuth from "@/src/hooks/useAuth";
import { useState } from "react";
import { StyleSheet, ImageBackground } from "react-native";

export default function HomeTab() {
  const { data, logout } = useAuth();
  const [isTokenVisible, setIsTokenVisible] = useState(false);

  function toggleTokenVisibility() {
    setIsTokenVisible(!isTokenVisible);
  }

  return (
    <Container>
      <ImageBackground
        source={{ uri: 'https://images.pexels.com/photos/3747505/pexels-photo-3747505.jpeg' }}
        style={styles.image}
      />
      <ThemedView style={styles.userInfo}>
        <ThemedText variant="subtitle">INFO ALUNO</ThemedText>
        <Avatar
          size={120}
          fallback={{ uri: require("@/src/assets/images/icon.png") }}
        />
        <ThemedView style={styles.card}>
          <ThemedText>ID: {data.user?.id}</ThemedText>
          <ThemedText>Nome: {data.user?.name}</ThemedText>
          <ThemedText>Email: {data.user?.email}</ThemedText>
          <ThemedText>{data.user?.biography}</ThemedText>
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.tokenInfo}>
        <ThemedText variant="subtitle">TOKEN INFO</ThemedText>
        <ThemedView style={[ styles.tokenCard, isTokenVisible? styles.tokenCardActive : styles.tokenCard ]}>
          {!isTokenVisible ? (
            <Button title="Toggle token info" onPress={toggleTokenVisibility}/>
          ): (
            <ThemedText onPress={toggleTokenVisibility}>{data.token}</ThemedText>
          )}
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
    backgroundColor: 'transparent'
  },
  image: {
    resizeMode: 'stretch',
    width: '110%',
    height: '110%',
    position: 'absolute',
  },
  userInfo: {
    backgroundColor: '#5b5b5bac',
    padding: '5%',
    width: '90%',
    height: '45%',
    borderRadius: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tokenInfo: {
    backgroundColor: '#5b5b5bac',
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '5%',
    margin: '2%',
    borderRadius: '10%'
  },
  tokenCard: {
    backgroundColor: 'transparent',
  },
  tokenCardActive: {
    borderWidth: 1,
    borderRadius: 6,
    borderColor: "#ccc",
    backgroundColor: 'transparent',
    maxHeight: '50%',
  },
});
