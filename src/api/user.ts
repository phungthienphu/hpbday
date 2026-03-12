import client from "./client";
import type { IUser, UpdateProfilePayload } from "../types/user";
import type { UserSearchResult } from "../types/group";

export const userApi = {
  async updateProfile(payload: UpdateProfilePayload): Promise<IUser> {
    const { data } = await client.patch("/users/me", payload);
    return data;
  },

  async uploadAvatar(file: File): Promise<IUser> {
    const formData = new FormData();
    formData.append("avatar", file);
    const { data } = await client.patch("/users/me/avatar", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  },

  async getUsers(): Promise<IUser[]> {
    const { data } = await client.get("/users");
    return data;
  },

  async searchUsers(q: string): Promise<UserSearchResult[]> {
    const { data } = await client.get("/users/search", { params: { q } });
    return data;
  },
};
