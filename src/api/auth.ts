import client, { TOKEN_KEY } from "./client";
import type { LoginPayload, RegisterPayload, IUser } from "../types/user";

export const authApi = {
  async login(payload: LoginPayload): Promise<{ token: string; user: IUser }> {
    const { data } = await client.post("/users/login", payload);
    localStorage.setItem(TOKEN_KEY, data.token);
    return data;
  },

  async register(
    payload: RegisterPayload,
  ): Promise<{ token: string; user: IUser }> {
    const { data } = await client.post("/users/register", payload);
    localStorage.setItem(TOKEN_KEY, data.token);
    return data;
  },

  async getMe(): Promise<IUser> {
    const { data } = await client.get("/users/me");
    return data;
  },

  logout() {
    localStorage.removeItem(TOKEN_KEY);
  },
};
