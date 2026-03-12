export type Priority = "low" | "medium" | "high" | "very_high";
export type ItemStatus = "todo" | "in_progress" | "resolve";

export interface IItem {
  _id: string;
  name: string;
  category: string;
  priority: Priority;
  link: string;
  note: string;
  status: ItemStatus;
  createdBy: string | { _id: string; name: string; username: string };
  group?: string | { _id: string; name: string };
  createdAt: string;
  updatedAt: string;
}

export interface CreateItemPayload {
  name: string;
  category: string;
  priority: Priority;
  link?: string;
  note?: string;
  group?: string;
}

export interface UpdateItemPayload {
  name?: string;
  category?: string;
  priority?: Priority;
  link?: string;
  note?: string;
}

export const PRIORITY_LABELS: Record<Priority, string> = {
  low: "Hơi thích xíu",
  medium: "Mê nha",
  high: "Thích nhắmmm",
  very_high: "Thích chếc đi đượcccc",
};

export const STATUS_LABELS: Record<ItemStatus, string> = {
  todo: "Chờ xử lý",
  in_progress: "Đang thực hiện",
  resolve: "Hoàn thành",
};

export const PRIORITY_COLORS: Record<Priority, string> = {
  low: "bg-gray-100 text-gray-700",
  medium: "bg-blue-100 text-blue-700",
  high: "bg-orange-100 text-orange-700",
  very_high: "bg-red-100 text-red-700",
};

export const STATUS_COLORS: Record<ItemStatus, string> = {
  todo: "bg-gray-100 text-gray-700",
  in_progress: "bg-yellow-100 text-yellow-700",
  resolve: "bg-green-100 text-green-700",
};
