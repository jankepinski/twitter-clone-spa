import { LoginRequest, LoginResponse } from "./dtos/login.dtos";
import { MeResponse } from "./dtos/me.dtos";
import { RegisterRequest, RegisterResponse } from "./dtos/register.dtos";

export const AuthApi = {
  login: (request: LoginRequest): Promise<LoginResponse> =>
    fetch("http://localhost:3000/auth/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    }).then(async (res) => {
      if (!res.ok) throw new Error(await res.json().then((err) => err.error));
      return res.json();
    }),
  register: (request: RegisterRequest): Promise<RegisterResponse> =>
    fetch("http://localhost:3000/auth/register", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    }).then(async (res) => {
      if (!res.ok) throw new Error(await res.json().then((err) => err.error));
      return res.json();
    }),
  logout: () => {
    return fetch("http://localhost:3000/auth/logout", {
      method: "POST",
      credentials: "include",
    });
  },
  me: (): Promise<MeResponse> => {
    return fetch("http://localhost:3000/auth/me", {
      credentials: "include",
    }).then(async (res) => {
      if (!res.ok) throw new Error(await res.json().then((err) => err.error));
      return res.json();
    });
  },
};
