import { isAxiosError } from "axios";
import api from "../lib/api";

// === API AUTH ENDPOINT===================================================== //
const REGISTER_ENDPOINT = "/api/User/register";
const LOGIN_ENDPOINT = "/api/Login/login";

// === API CALL --> REGISTER ENDPOINT ======================================= //
export async function register(email: string, password: string) {
  try {
    const response = await api.post(REGISTER_ENDPOINT, { email, password });

    const { data, status, statusText } = response;
    console.warn(`
        | REGISTER REQUEST | \n 
          DATA:             ${data} \n
          STATUS:           ${status} \n
          STATUS TEXT:      ${statusText} \n
    `);

    // 1. RECEIVE JWT FROM RESPONSE   | const {token} = response;
    // 2. DECODE JWT                  | decode logic...
    // 3. EXTRACT USER INFO FROM JWT  | const user = ...
    // 4. RETURN THE USER AND TOKEN   | return {user, token}
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Registration failed");
    }
    throw new Error("Network error");
  }
}

// === API CALL --> LOGIN ENDPOINT ========================================== //
export async function login(email: string, password: string) {
  try {
    const response = await api.post(LOGIN_ENDPOINT, { email, password });

    const { data, status, statusText } = response;
    console.warn(`
        | LOGIN REQUEST | \n 
          DATA:             ${data} \n
          STATUS:           ${status} \n
          STATUS TEXT:      ${statusText} \n
    `);

    // 1. RECEIVE JWT FROM RESPONSE   | const {token} = response;
    // 2. DECODE JWT                  | decode logic...
    // 3. EXTRACT USER INFO FROM JWT  | const user = ...
    // 4. RETURN THE USER AND TOKEN   | return {user, token}
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
    throw new Error("Network error");
  }
}
