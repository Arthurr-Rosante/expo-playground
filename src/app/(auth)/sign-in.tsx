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
      <ThemedView>
        <ThemedText variant="title">[ LOGIN FORM ]</ThemedText>

        <ThemedView>
          <Input
            value={formData["email"]}
            error={formDataErrors["email"]}
            onChangeText={(t) => setFormData((prev) => ({ ...prev, email: t }))}
            placeholder="E-mail"
          />
          <Input
            value={formData["password"]}
            error={formDataErrors["password"]}
            onChangeText={(t) =>
              setFormData((prev) => ({ ...prev, password: t }))
            }
            placeholder="Senha"
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
        <Link href={"/(auth)/sign-up"} style={{ color: "#0000ff" }}>
          Sign Up
        </Link>
      </ThemedText>
      <Link href={"/(auth)/google-sign-in"} style={{ color: "#0000ff" }}>
        Sign in With Google
      </Link>
    </Container>
  );
}
