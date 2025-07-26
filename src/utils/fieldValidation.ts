import { FormCredentials } from "../@types/utils";

const EMAIL_REGEX = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;

function emailValidation(email: string) {
  let error = "";
  if (!email) {
    error = "Email é um campo obrigatório.";
  } else if (!EMAIL_REGEX.test(email)) {
    error = "Digite um email válido.";
  }
  return error;
}

function passwordValidation(password: string) {
  let error = "";
  if (!password) {
    error = "Senha é um campo obrigatório.";
  } else if (!PASSWORD_REGEX.test(password)) {
    error = `Deve possuir 8 caracteres; letra maiúscula e caracter especial`;
  }
  return error;
}

function confirmPasswordValidation(confirmPassword: string, password: string) {
  let error = "";
  if (!confirmPassword) {
    error = "Confirme sua senha.";
  } else if (confirmPassword !== password) {
    error = "Senhas não coincidem.";
  }
  return error;
}

export function validate(credentials: FormCredentials) {
  const { email, password, confirmPassword } = credentials;
  let errors: FormCredentials = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  errors.email = emailValidation(email);
  errors.password = passwordValidation(password);
  if (confirmPassword) {
    errors.confirmPassword = confirmPasswordValidation(
      confirmPassword,
      password
    );
  }

  return errors;
}
