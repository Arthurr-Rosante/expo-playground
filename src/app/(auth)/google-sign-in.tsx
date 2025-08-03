import GoogleLogin from "@/src/components/GoogleLogin";
import Container from "@/src/components/ui/Container";
import ThemedText from "@/src/components/ui/ThemedText";
import {
  type FirebaseAuthTypes,
  onAuthStateChanged,
  signOut,
} from "@react-native-firebase/auth";
import { useEffect, useState } from "react";
import { Button, Image } from "react-native";
import firebase from "@/firebase";

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
    <Container>
      <ThemedText variant="title">[ GOOGLE SIGN IN]</ThemedText>
      {user ? (
        <>
          <ThemedText>Hi, {user?.displayName}</ThemedText>
          <ThemedText>{user?.email}</ThemedText>
          <ThemedText>{user?.uid}</ThemedText>
          <Image
            source={{ uri: user?.photoURL as string }}
            style={{ width: 100, height: 100 }}
            resizeMode="cover"
          />
          <Button title="Sign Out" onPress={logout} />
        </>
      ) : (
        <>
          <GoogleLogin />
        </>
      )}
    </Container>
  );
}
