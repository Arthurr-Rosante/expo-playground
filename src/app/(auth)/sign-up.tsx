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

export default function SignUp() {
  const { register, isLoading } = useAuth();

  const [formData, setFormData] = useState<FormCredentials>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formDataErrors, setFormDataErrors] = useState<FormCredentials>({
    email: "",
    password: "",
    confirmPassword: "",
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
    console.log("REGISTER | CREDENTIALS ", credentials);
    await register(formData.email, formData.password);
  };

  return (
    <Container>
      <ThemedView>
        <ThemedText variant="title">[ REGISTER FORM ]</ThemedText>

        <ThemedView>
          <Input
            value={formData["email"]}
            error={formDataErrors["email"]}
            onChangeText={(t) => setFormData((prev) => ({ ...prev, email: t }))}
            placeholder="Digite seu E-mail"
          />
          <Input
            value={formData["password"]}
            error={formDataErrors["password"]}
            onChangeText={(t) =>
              setFormData((prev) => ({ ...prev, password: t }))
            }
            placeholder="Digite sua senha"
          />
          <Input
            value={formData["confirmPassword"]}
            error={formDataErrors["confirmPassword"]}
            onChangeText={(t) =>
              setFormData((prev) => ({ ...prev, confirmPassword: t }))
            }
            placeholder="Confirme sua senha"
          />
          <Button
            disabled={!isFormValid || isLoading}
            title={isLoading ? "Loading..." : "REGISTER"}
            onPress={() => onSubmit(formData)}
          />
        </ThemedView>
      </ThemedView>

      <ThemedText>
        Already has an account?{" "}
        <Link href={"/(auth)/sign-in"} style={{ color: "#0000ff" }}>
          Sign In
        </Link>
      </ThemedText>
    </Container>
  );
}
