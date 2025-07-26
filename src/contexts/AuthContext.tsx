import { createContext, PropsWithChildren, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SplashScreen } from "expo-router";
import { AuthState } from "../@types/state";
import { MOCK_USER, MOCK_TOKEN } from "../constants/mock";
import * as auth from "@/src/services/AuthService";
import useToast from "../hooks/useToast";

const AUTH_STORAGE_KEY = "expo-playground-auth-data";
SplashScreen.preventAutoHideAsync();

export const AuthContext = createContext<AuthState>({
  data: {
    user: null,
    token: null,
  },
  isLoading: false,
  error: null,
  register: async () => {},
  login: async () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [data, setData] = useState<AuthState["data"]>({
    user: null,
    token: null,
  });
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { showToast } = useToast();

  // === STORE DATA ON      ASYNC STORAGE =================================== //
  const storeData = async (data: AuthState["data"]): Promise<void> => {
    await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(data));
    setData(data);
  };

  // === LOAD DATA FROM     ASYNC STORAGE =================================== //
  const loadData = async (): Promise<AuthState["data"] | null> => {
    const value = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
    return value ? JSON.parse(value) : null;
  };

  // === REGISTER   FUNCTION ================================================ //
  const register = async (email: string, password: string) => {
    try {
      setIsLoading(true);

      // const {user, token} = await auth.register(email, password);
      // storeData(user, token);

      storeData({ user: MOCK_USER, token: MOCK_TOKEN });

      showToast({
        title: "Usuário Registrado",
        description: "redirecionando...",
        variant: "success",
      });
    } catch (error) {
      setError(error as string);
      showToast({
        title: "Erro Registrando",
        description: error as string,
        variant: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // === LOGIN      FUNCTION ================================================ //
  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);

      // const {user, token} = await auth.login(email, password);
      // storeData(user, token);

      storeData({ user: MOCK_USER, token: MOCK_TOKEN });
      showToast({
        title: "Usuário Logado",
        description: "redirecionando...",
        variant: "success",
      });
    } catch (error) {
      setError(error as string);
      showToast({
        title: "Erro Logando",
        description: error as string,
        variant: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // === LOGOUT     FUNCTION ================================================ //
  const logout = () => {
    storeData({ user: null, token: null });
    showToast({
      title: "Usuário Deslogado",
      description: "redirecionando...",
      variant: "warning",
    });
  };

  // === TRIES TO LOAD STORED DATA ========================================== //
  useEffect(() => {
    (async () => {
      const stored = await loadData();
      if (stored) storeData(stored);
      setIsReady(true);
    })();
  }, []);

  useEffect(() => {
    if (isReady) SplashScreen.hideAsync();
  }, [isReady]);

  return (
    <AuthContext.Provider
      value={{ data, isLoading, error, register, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
