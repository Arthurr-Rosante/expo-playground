import { isAxiosError } from "axios";
import api from "./api";
import * as jose from "jose";

// === API AUTH ENDPOINT===================================================== //
const REGISTER_ENDPOINT = "/api/Auth/register";
const LOGIN_ENDPOINT = "/api/Auth/login";
const GET_BY_ID_ENDPOINT = "api/User/get-by-id";
const SECRET = "-T%QuRqutu)]LoDn7Let59URPHGsTLWp3b1aQKE";

// === API CALL --> REGISTER ENDPOINT ======================================= //
export async function register(email: string, password: string) {
  try {
    const response = await api.post(REGISTER_ENDPOINT, {
      name: "user-test" + email,
      email,
      password,
    });

    const { token } = response.data;
    const payload = jose.decodeJwt(token);
    const userId =
      payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid"];

    const response2 = await api.get(`${GET_BY_ID_ENDPOINT}/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return { user: response2.data, token };
  } catch (error) {
    console.log(JSON.stringify(error, null, 2));
    throw new Error("Registro Falhou");
  }
}

// === API CALL --> LOGIN ENDPOINT ========================================== //
export async function login(email: string, password: string) {
  try {
    // 1. Chamada da API
    const response = await api.post(LOGIN_ENDPOINT, { email, password });
    // 2. Extração do Token
    const { token } = response.data;
    // 3. Decodificação
    const payload = jose.decodeJwt(token);
    // 4. Pegando o ID e Email
    const userId =
      payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid"];

    const userEmail = payload["email"];

    // 5. Retornando o usuário
    const response2 = await api.get(`${GET_BY_ID_ENDPOINT}/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return { user: response2.data, token };
  } catch (error) {
    console.log(JSON.stringify(error, null, 2));
    throw new Error("Login Falhou");
  }
}
