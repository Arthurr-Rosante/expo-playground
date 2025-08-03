import { Button } from "react-native";
import useGoogleLogin from "../hooks/useGoogleLogin";

const GoogleLogin = () => {
  const { login, inProgress } = useGoogleLogin();

  const onPress = async () => {
    await login();
  };

  return (
    <Button
      disabled={inProgress}
      onPress={onPress}
      title="Sign in with Google"
    />
  );
};

export default GoogleLogin;
