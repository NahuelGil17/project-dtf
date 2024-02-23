export class OrdersStateModel {
  loading?: boolean;
  orders?: any[] | null;
  filteredOrders?: any[] | null;
  paginatedOrders?: any[] | null;
  selectedOrder?: any | null;
}
