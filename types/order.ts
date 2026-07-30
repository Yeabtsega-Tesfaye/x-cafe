export type OrderStatus =
  | "New"
  | "Preparing"
  | "Ready";

export interface OrderItem {
  name: string;
  quantity: number;
}

export interface Order {
  id: string;
  table: string;

  items: OrderItem[];

  time: string;

  note?: string;

  status: OrderStatus;
}