export interface IUser {
  _id: string;
  username: string;
  role: 0 | 1; // 0: user, 1: admin
  name: string;
  birthday: string | null;
  avatarUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export interface RegisterPayload {
  username: string;
  password: string;
  name?: string;
}

export interface UpdateProfilePayload {
  name?: string;
  birthday?: string | null;
}
