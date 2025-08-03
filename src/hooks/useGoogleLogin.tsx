import { GoogleSignin } from "@react-native-google-signin/google-signin";
import firebase from "@/firebase";
import rnfb from "@react-native-firebase/auth";
import { useState } from "react";

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
  offlineAccess: true,
});

const useGoogleLogin = () => {
  const [inProgress, setInProgress] = useState(false);

  const handleLogin = async () => {
    setInProgress(true);

    // Desconecta do Google todas as vezes para chamar 'account picker'
    await GoogleSignin.signOut();

    await GoogleSignin.hasPlayServices();
    const response = await GoogleSignin.signIn();
    if (response && response.data) {
      console.log(response.data);
      const googleCredential = rnfb.GoogleAuthProvider.credential(
        response.data.idToken
      );
      await firebase.auth().signInWithCredential(googleCredential);
    } else {
      console.warn("No response from GoogleSignin");
    }
    setInProgress(false);
  };

  return {
    inProgress,
    login: handleLogin,
  };
};

export default useGoogleLogin;
