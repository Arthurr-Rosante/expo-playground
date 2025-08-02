import { User } from "./entities";

export interface AuthState {
  data: {
    user: User | null;
    token: string | null;
  };
  isLoading: boolean;
  register: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}
