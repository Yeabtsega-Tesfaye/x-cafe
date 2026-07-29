export interface Table {
  id: string;
  name: string;
  seats: number;
  status: "Available" | "Occupied" | "Reserved";
}