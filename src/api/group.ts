import client from "./client";
import type { IGroup, CreateGroupPayload } from "../types/group";

export const groupApi = {
  async createGroup(payload: CreateGroupPayload): Promise<IGroup> {
    const { data } = await client.post("/groups", payload);
    return data;
  },

  async getGroups(): Promise<IGroup[]> {
    const { data } = await client.get("/groups");
    return data;
  },

  async getGroup(id: string): Promise<IGroup> {
    const { data } = await client.get(`/groups/${id}`);
    return data;
  },

  async addMember(groupId: string, userId: string): Promise<IGroup> {
    const { data } = await client.post(`/groups/${groupId}/members`, { userId });
    return data;
  },

  async removeMember(groupId: string, userId: string): Promise<void> {
    await client.delete(`/groups/${groupId}/members/${userId}`);
  },

  async deleteGroup(id: string): Promise<void> {
    await client.delete(`/groups/${id}`);
  },
};
