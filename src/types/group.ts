import type { IUser } from "./user";

export interface IGroupMember {
  _id: string;
  name: string;
  username: string;
  avatarUrl?: string;
}

export interface IGroup {
  _id: string;
  name: string;
  createdBy: string | IGroupMember;
  members: IGroupMember[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateGroupPayload {
  name: string;
}

export type UserSearchResult = Pick<IUser, "_id" | "name" | "username" | "avatarUrl">;
