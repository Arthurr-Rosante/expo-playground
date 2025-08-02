import { User } from "../@types/entities";
import { handleApiError } from "../utils/handleApiError";
import api from "./api";
import * as jose from "jose";

// === ENDPOINTS ============================================================ //
const REGISTER_ENDPOINT = "/Auth/register";
const LOGIN_ENDPOINT = "/Auth/login";
const GET_BY_ID_ENDPOINT = "/User/get-by-id";

function extractIdFromToken(token: string): string {
  const payload = jose.decodeJwt(token);
  const id =
    payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid"];
  if (!id || typeof id !== "string") {
    throw new Error("Token inválido: ID do usuário ausente.");
  }
  return id;
}

// === API CALL --> GET USER BY ID ENDPOINT ================================= //
async function getUserById(id: string, token: string): Promise<User> {
  try {
    const response = await api.get(`${GET_BY_ID_ENDPOINT}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data as User;
  } catch (error) {
    throw new Error("Houve um erro buscando usuário pelo ID.");
  }
}

// === API CALL --> REGISTER ENDPOINT ======================================= //
export async function register(name: string, email: string, password: string) {
  try {
    const response = await api.post(REGISTER_ENDPOINT, {
      name,
      email,
      password,
    });
    const { token } = response.data;

    const id = extractIdFromToken(token);
    const user = await getUserById(id, token);

    return { user, token };
  } catch (error) {
    throw handleApiError(error, "Registro falhou");
  }
}

// === API CALL --> LOGIN ENDPOINT ========================================== //
export async function login(email: string, password: string) {
  try {
    const { data } = await api.post(LOGIN_ENDPOINT, {
      email,
      password,
    });
    const { token } = data.token;
    const id = extractIdFromToken(token);
    const user = await getUserById(id, token);

    return { user, token };
  } catch (error) {
    throw handleApiError(error, "Login falhou");
  }
}
