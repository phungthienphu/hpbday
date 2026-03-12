import client from "./client";
import type {
  IItem,
  CreateItemPayload,
  UpdateItemPayload,
  ItemStatus,
} from "../types/item";

export const itemApi = {
  async getItems(params?: {
    category?: string;
    status?: string;
    priority?: string;
    group?: string;
  }): Promise<IItem[]> {
    const { data } = await client.get("/items", { params });
    return data;
  },

  async getItem(id: string): Promise<IItem> {
    const { data } = await client.get(`/items/${id}`);
    return data;
  },

  async createItem(payload: CreateItemPayload): Promise<IItem> {
    const { data } = await client.post("/items", payload);
    return data;
  },

  async updateItem(id: string, payload: UpdateItemPayload): Promise<IItem> {
    const { data } = await client.patch(`/items/${id}`, payload);
    return data;
  },

  async updateStatus(id: string, status: ItemStatus): Promise<IItem> {
    const { data } = await client.patch(`/items/${id}/status`, { status });
    return data;
  },

  async updateGroup(id: string, group: string | null): Promise<IItem> {
    const { data } = await client.patch(`/items/${id}/group`, { group });
    return data;
  },

  async deleteItem(id: string): Promise<void> {
    await client.delete(`/items/${id}`);
  },
};
