import client, { TOKEN_KEY } from "./client";
import type { IUser } from "../types/user";

export interface FaceStatus {
  hasFace: boolean;
  faceRegisteredAt: string | null;
}

export const faceApi = {
  async getStatus(): Promise<FaceStatus> {
    const { data } = await client.get("/users/face/status");
    return data;
  },

  async register(faceDescriptor: number[]): Promise<void> {
    await client.post("/users/face/register", { faceDescriptor });
  },

  async update(faceDescriptor: number[]): Promise<void> {
    await client.put("/users/face/register", { faceDescriptor });
  },

  async remove(): Promise<void> {
    await client.delete("/users/face");
  },

  async login(faceDescriptor: number[]): Promise<{ token: string; user: IUser }> {
    const { data } = await client.post("/users/face/login", { faceDescriptor });
    localStorage.setItem(TOKEN_KEY, data.token);
    return data;
  },
};
