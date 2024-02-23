import { Injectable } from '@angular/core';
import { Firestore, collection, query, where, getDocs } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Order } from '../interfaces/order.interface';

@Injectable({
  providedIn: 'root',
})
export class OrderService {

  constructor(private firestore: Firestore) { }

  getOrdersByUserId(userId: string): Observable<Order[]> {
    return new Observable((observer) => {
      const ordersRef = collection(this.firestore, 'orders');
      const ordersQuery = query(ordersRef, where('userId', '==', userId));
      getDocs(ordersQuery).then((snapshot) => {
        const orders: Order[] = [];
        snapshot.forEach((doc) => {
          orders.push(doc.data() as Order);   
        });
        observer.next(orders);
      }).catch((error) => {
        observer.error(error);
      });
    });
  }

  searchOrders(input: string): Observable<Order[]> {
    return new Observable((observer) => {
      const ordersRef = collection(this.firestore, 'orders');
      const ordersQuery = query(ordersRef, where('name', '>=', input));
      getDocs(ordersQuery).then((snapshot) => {
        const orders: Order[] = [];
        snapshot.forEach((doc) => {
          orders.push(doc.data() as Order);
        });
        observer.next(orders);
      }).catch((error) => {
        observer.error(error);
      });
    });
  }


}
