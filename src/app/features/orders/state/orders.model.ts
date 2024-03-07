import { Order } from "../interfaces/order.interface";

export class OrdersStateModel {
  loading?: boolean;
  orders?: Order[] | null;
  selectedOrder?: any | null;
  currentFiles?: string[] | null;
  page?: number;
  totalOrders?: number;
  pageSize?: number;
  filterInput?: string;
}
