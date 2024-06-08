import { MeResponse } from "@/services/auth/dtos/me.dtos";
import { createContext } from "react";

export const AuthContext = createContext<MeResponse | undefined>(undefined);
