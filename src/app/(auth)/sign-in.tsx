import { FormCredentials } from "@/src/@types/utils";
import Button from "@/src/components/ui/Button";
import Container from "@/src/components/ui/Container";
import Input from "@/src/components/ui/Input";
import ThemedText from "@/src/components/ui/ThemedText";
import ThemedView from "@/src/components/ui/ThemedView";
import useAuth from "@/src/hooks/useAuth";
import { Link } from "expo-router";
import { useState } from "react";

export default function SignIn() {
  const { login, isLoading } = useAuth();
  const [formData, setFormData] = useState<FormCredentials>({
    email: "",
    password: "",
  });

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
            onChangeText={(t) => setFormData((prev) => ({ ...prev, email: t }))}
            placeholder="dummy@gmail.com"
          />
          <Input
            value={formData["password"]}
            onChangeText={(t) =>
              setFormData((prev) => ({ ...prev, password: t }))
            }
            placeholder="************"
          />
          <Button
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
    </Container>
  );
}
