import { useContext } from "react";
import { AuthContext } from "@/src/contexts/AuthContext";

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth must be used within an AuthContext Provider");

  return context;
};

export default useAuth;
