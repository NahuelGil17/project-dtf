import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  startAfter,
  where,
} from '@angular/fire/firestore';
import { Observable, from, map } from 'rxjs';
import { Order } from '../interfaces/order.interface';
import {
  Storage,
  getDownloadURL,
  ref,
  uploadBytes,
} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  pageSize: number = 10;
  storage = inject(Storage);
  constructor(private fireStore: Firestore) {}

  getOrdersByUserId(userId: string): Observable<Order[]> {
    const ordersRef = collection(this.fireStore, 'orders');
    const ordersQuery = query(ordersRef, where('userId', '==', userId));

    return from(getDocs(ordersQuery)).pipe(
      map((snapshot) => {
        const orders: Order[] = [];
        snapshot.forEach((doc) => {
          orders.push(doc.data() as Order);
        });
        return orders;
      })
    );
  }

  searchOrders(userId: string, input: string): Observable<Order[] | void> {
    input = input.toLowerCase();
    const ordersRef = collection(this.fireStore, 'orders');

    const startName = input;
    const endName = input + '\uf8ff';

    const ordersQuery = query(
      ordersRef,
      where('userId', '==', userId),

      where('workName', '>=', startName),
      where('workName', '<=', endName),
      orderBy('workName')
    );

    return from(getDocs(ordersQuery)).pipe(
      map((snapshot) => {
        const orders: Order[] = [];
        snapshot.forEach((doc) => {
          orders.push(doc.data() as Order);
        });
        return orders;
      })
    );
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
      getDocs(ordersQuery)
        .then((snapshot) => {
          const orders: Order[] = [];
          snapshot.forEach((doc) => {
            orders.push(doc.data() as Order);
          });
          observer.next(orders);
        })
        .catch((error) => {
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

  saveOrderFile(file: any) {
    console.log(file);
    const storageRef = ref(this.storage, `orders/${this.getRandomUid()}`);
    return from(uploadBytes(storageRef, file.file));
  }

  saveOrder(order: any) {
    return from(addDoc(collection(this.fireStore, 'orders'), order));
  }

  getAvatarUrl(ref: any) {
    return from(getDownloadURL(ref));
  }

  getRandomUid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }
}
