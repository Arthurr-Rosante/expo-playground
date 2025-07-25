import { User } from "./entities";

export interface AuthState {
  data: {
    user: User | null;
    token: string | null;
  };
  isLoading: boolean;
  error: string | null;
  register: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}
