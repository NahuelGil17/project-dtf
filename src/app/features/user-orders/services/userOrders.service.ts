import { Injectable } from '@angular/core';
import { Firestore, collection, query, where, getDocs, startAt, endAt, orderBy, startAfter, limit } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Order } from '../interfaces/order.interface';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  pageSize: number = 10;
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
      const ordersQuery = query(
        ordersRef,
        where('title', '>=', input),
        orderBy('title'),
        startAt(input),
        endAt(input + '\uf8ff')
      );
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

  nextPage(userId: string, lastOrder: any): Observable<Order[]> {
    const ordersRef = collection(this.firestore, 'orders');
    let ordersQuery = query(
      ordersRef,
      where('userId', '==', userId),
      orderBy('title'),
      startAfter(lastOrder),
      limit(this.pageSize)
    );
    return new Observable((observer) => {
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



