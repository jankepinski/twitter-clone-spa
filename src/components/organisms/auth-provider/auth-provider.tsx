import { useQuery } from "@tanstack/react-query";
import { ReactNode } from "react";
import { AuthApi } from "@/services/auth/auth-api";
import { AuthContext } from "@/+shared/contexts/auth-context";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data, isError } = useQuery({
    queryKey: ["auth"],
    queryFn: AuthApi.me,
  });
  console.log(isError, data);

  return (
    <AuthContext.Provider value={isError ? undefined : data}>
      {children}
    </AuthContext.Provider>
  );
};
