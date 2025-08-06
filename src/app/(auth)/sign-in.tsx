import { FormCredentials } from "@/src/@types/utils";
import Button from "@/src/components/ui/Button";
import Container from "@/src/components/ui/Container";
import Input from "@/src/components/ui/Input";
import ThemedText from "@/src/components/ui/ThemedText";
import ThemedView from "@/src/components/ui/ThemedView";
import useAuth from "@/src/hooks/useAuth";
import { validate } from "@/src/utils/fieldValidation";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { ImageBackground, StyleSheet } from "react-native";

export default function SignIn() {
  const { login, isLoading } = useAuth();

  const [formData, setFormData] = useState<FormCredentials>({
    email: "",
    password: "",
  });
  const [formDataErrors, setFormDataErrors] = useState<FormCredentials>({
    email: "",
    password: "",
  });

  // === FORM VERIFICATION ================================================== //
  const isFormValid =
    Object.values(formDataErrors).every((err) => err === "") &&
    Object.values(formData).every((val) => val.trim() !== "");
  useEffect(() => {
    const validationErrors = validate(formData);
    if (Object.values(validationErrors).some((err) => err !== "")) {
      setFormDataErrors(validationErrors);
      return;
    }
    setFormDataErrors({ email: "", password: "" });
  }, [formData]);
  // ======================================================================== //

  const onSubmit = async (credentials: FormCredentials) => {
    console.log("LOGIN | CREDENTIALS ", credentials);
    await login(formData.email, formData.password);
  };

  return (
    <Container>
      <ImageBackground
        source={{ uri: 'https://images.pexels.com/photos/256453/pexels-photo-256453.jpeg' }}
        style={styles.imageBackground}
      />
      <ThemedView style={styles.container}>
        
        <ThemedText variant="title">PORTAL ALUNO</ThemedText>

        <ThemedView style={styles.form}>
          <Input
            value={formData["email"]}
            error={formDataErrors["email"]}
            onChangeText={(t) => setFormData((prev) => ({ ...prev, email: t }))}
            placeholder="E-mail"
            style={styles.input}
          />
          <Input
            value={formData["password"]}
            error={formDataErrors["password"]}
            onChangeText={(t) =>
              setFormData((prev) => ({ ...prev, password: t }))
            }
            placeholder="Senha"
            style={styles.input}
          />

          <Button
            disabled={!isFormValid || isLoading}
            title={isLoading ? "Loading..." : "LOGIN"}
            onPress={() => onSubmit(formData)}
          />
        </ThemedView>
      </ThemedView>
      <ThemedText>
        Doesn't have an account?{" "}
        <Link href={"/(auth)/sign-up"} style={{ color: "#b6ff39ff" }}>
          Sign Up
        </Link>
      </ThemedText>
      <Link href={"/(auth)/google-sign-in"} style={{ color: "#b6ff39ff" }}>
        Sign in With Google
      </Link>
    </Container>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    resizeMode: 'stretch',
    width: '110%',
    height: '110%',
    position: 'absolute',
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: '5%',
    borderRadius: '5%',
    margin: 5,
    backgroundColor: '#5b5b5bac',
    width: '80%'
  },
  form: {
    backgroundColor: '#414141cf',
    padding: '5%',
    borderRadius: '5%',
    width: '100%',
  },
  input: {
    
  },
})