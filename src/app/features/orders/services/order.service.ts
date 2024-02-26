import { Injectable } from '@angular/core';
import { Firestore, collection, query, where, getDocs, startAt, endAt, orderBy, startAfter, limit, getDoc, doc, setDoc } from "@angular/fire/firestore";
import { Observable, from } from 'rxjs';
import { Order } from '../interfaces/order.interface';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  pageSize: number = 10;
  constructor(private fireStore: Firestore) { }

  getOrdersByUserId(userId: string): Observable<Order[]> {
    return new Observable((observer) => {
      const ordersRef = collection(this.fireStore, 'orders');
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
      const ordersRef = collection(this.fireStore, 'orders');
      const ordersQuery = query(
        ordersRef,
        where('workName', '>=', input),
        orderBy('workName'),
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
    const ordersRef = collection(this.fireStore, 'orders');
    let ordersQuery = query(
      ordersRef,
      where('userId', '==', userId),
      orderBy('workName'),
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

  getOrders() {
    return from(getDocs(collection(this.fireStore, 'orders')));
  }

  getOrderById(id: string) {
    return from(getDoc(doc(this.fireStore, 'orders', id)));
  }

  saveOrder(order: any) {
    return from(setDoc(doc(this.fireStore, 'orders', order.id), order));
  }

}


