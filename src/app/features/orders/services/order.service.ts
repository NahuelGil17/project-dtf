import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  query,
  where,
  getDocs,
  startAt,
  endAt,
  orderBy,
  startAfter,
  limit,
  getDoc,
  doc,
  setDoc,
  endBefore,
  limitToLast,
} from '@angular/fire/firestore';
import { Observable, from, map } from 'rxjs';
import { Order } from '../interfaces/order.interface';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  pageSize: number = 10;
  ordersRef = collection(this.fireStore, 'orders');
  lastDoc: any;

  constructor(private fireStore: Firestore) {}

  GetTotalOrdersByUserId(userId: string): Observable<number> {
    const ordersQuery = query(this.ordersRef, where('userId', '==', userId));
    return from(getDocs(ordersQuery)).pipe(
      map((snapshot) => {
        return snapshot.size;
      })
    );
  }

  searchOrders(userId: string, input: string): Observable<Order[] | void> {
    input = input.toLowerCase();

    const startName = input;
    const endName = input + '\uf8ff';

    const ordersQuery = query(
      this.ordersRef,
      where('userId', '==', userId),

      where('workName', '>=', startName),
      where('workName', '<=', endName),
      orderBy('workName')
    );

    return from(getDocs(ordersQuery)).pipe(
      map((snapshot) => {
        const orders: Order[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          if (data) {
            orders.push({ id: doc.id, ...data } as Order);
          }
        });
        return orders;
      })
    );
  }

  getOrdersByPage(
    userId: string,
    isNextPage?: boolean
  ): Observable<Order[] | void> {
    const pageSize = this.pageSize;
    let ordersQuery: any;

    if (isNextPage && this.lastDoc) {
      ordersQuery = query(
        this.ordersRef,
        where('userId', '==', userId),
        orderBy('workName'),
        startAfter(this.lastDoc),
        limit(pageSize)
      );
    } else if (!isNextPage && this.lastDoc) {
      ordersQuery = query(
        this.ordersRef,
        where('userId', '==', userId),
        orderBy('workName'),
        endBefore(this.lastDoc),
        limit(pageSize)
      );
    } else {
      ordersQuery = query(
        this.ordersRef,
        where('userId', '==', userId),
        orderBy('workName'),
        limit(pageSize)
      );
    }

    return from(getDocs(ordersQuery)).pipe(
      map((snapshot) => {
        const orders: Order[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          if (data) {
            orders.push({ id: doc.id, ...data } as Order);
          }
        });
        // Actualiza lastDoc con el último documento de esta página.
        this.lastDoc = snapshot.docs[snapshot.docs.length - 1];
        return orders;
      })
    );
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
