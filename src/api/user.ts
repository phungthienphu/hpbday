import client from "./client";
import type { IUser, UpdateProfilePayload } from "../types/user";

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
};
