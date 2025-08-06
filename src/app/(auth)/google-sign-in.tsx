import GoogleLogin from "@/src/components/GoogleLogin";
import Container from "@/src/components/ui/Container";
import ThemedText from "@/src/components/ui/ThemedText";
import {
  type FirebaseAuthTypes,
  onAuthStateChanged,
  signOut,
} from "@react-native-firebase/auth";
import { useEffect, useState } from "react";
import { Button, Image, ImageBackground, StyleSheet } from "react-native";
import firebase from "@/firebase";
import ThemedView from "@/src/components/ui/ThemedView";

export default function GoogleSignIn() {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  const logout = async () => {
    await signOut(firebase.auth());
  };

  useEffect(() => {
    return onAuthStateChanged(firebase.auth(), async (user) => {
      setUser(user);
    });
  }, []);

  return (
    <Container style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://images.pexels.com/photos/256453/pexels-photo-256453.jpeg' }}
        style={styles.imageBackground}
      />
      <ThemedView style={styles.container}>
        <Image
          source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/800px-Google_%22G%22_logo.svg.png' }}
          style={styles.image}
        />
        <ThemedText variant="title">GOOGLE SIGN IN</ThemedText>
      </ThemedView>
      {user ? (
        <ThemedView style={styles.user}>
          <ThemedText>Hi, {user?.displayName}</ThemedText>
          <ThemedText>{user?.email}</ThemedText>
          <ThemedText>{user?.uid}</ThemedText>
          <Image
            source={{ uri: user?.photoURL as string }}
            style={{ width: 100, height: 100, borderRadius: 1000 }}
            resizeMode="cover"
          />
          <ThemedView style={{ margin: 10 }}>
            <Button title="Sign Out" onPress={logout} />
          </ThemedView>
        </ThemedView>
      ) : (
        <>
          <GoogleLogin />
        </>
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
  },
  image: {
    resizeMode: 'stretch',
    width: 30,
    height: 30,
    alignSelf: 'center',
  },
  imageBackground: {
    resizeMode: 'stretch',
    width: '110%',
    height: '110%',
    position: 'absolute',
  },
  user: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: '5%',
    backgroundColor: '#414141cf',
    borderRadius: '10%',
  }
})