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
  endBefore,
  limitToLast,
  startAfter,
  where,
} from '@angular/fire/firestore';
import { Observable, from, map, combineLatest } from 'rxjs';
import { Order } from '../interfaces/order.interface';
import {
  Storage,
  getDownloadURL,
  ref,
  uploadBytes,
} from '@angular/fire/storage';
import { environment } from '../../../environment/environment.develop';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  pageSize: number = environment.PAGE_SIZE;

  lastDoc: any;

  storage = inject(Storage);
  constructor(private fireStore: Firestore) {}

  GetTotalOrdersByUserId(userId: string, isAdmin: boolean): Observable<number> {
    let ordersRef = collection(this.fireStore, 'orders');
    const ordersQuery = query(ordersRef, where('userId', '==', userId));

    return from(getDocs(ordersQuery)).pipe(
      map((snapshot) => {
        return snapshot.size;
      })
    );
  }

  searchOrders(
    userId: string,
    isAdmin: boolean,
    input: string
  ): Observable<Order[] | void> {
    input = input.toLowerCase();
  
    const startName = input;
    const endName = input + '\uf8ff';
    let ordersRef = collection(this.fireStore, 'orders');
  
    // Consulta para buscar por workName
    const workNameQuery = query(
      ordersRef,
      where('userId', '==', userId),
      where('workName', '>=', startName),
      where('workName', '<=', endName),
      orderBy('workName')
    );
  
    //Consulta para buscar por id
    const idQuery = query(
      ordersRef,
      where('userId', '==', userId),
      where('custId', '>=', startName),
      where('custId', '<=', endName),
      orderBy('custId')
    );
    this.lastDoc = null;
    // return from(getDocs(idQuery)).pipe(
    //   map((snapshot) => {
    //     const orders: Order[] = [];
    //     snapshot.forEach((doc) => {
    //       const data = doc.data();
    //       if (data) {
    //         orders.push({ id: doc.id, ...data } as Order);
    //       }
    //     });
    //     return orders;
    //   })
    // );

    // Combino ambos resultados de ambas consultas en un solo observable
    return combineLatest([
      from(getDocs(workNameQuery)).pipe(
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
      ),
      from(getDocs(idQuery)).pipe(
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
      ),
    ]).pipe(
      map(([ordersByWorkName, ordersById]) => {
        // Combinar y devolver los resultados de ambas consultas
        return [...ordersByWorkName, ...ordersById];
      })
    );
  }

  getOrdersByPage(
    userId: string,
    isAdmin: boolean,
    isNextPage?: 'next' | 'prev' | null
  ): Observable<Order[] | void> {
    const pageSize = this.pageSize;
    let ordersQuery: any;
    let ordersRef = collection(this.fireStore, 'orders');

    if (isNextPage === 'next' && this.lastDoc) {
      ordersQuery = query(
        ordersRef,
        where('userId', '==', userId),
        orderBy('workName'),
        startAfter(this.lastDoc),
        limit(pageSize)
      );
    }
    if (isNextPage === 'prev' && this.lastDoc) {
      ordersQuery = query(
        ordersRef,
        where('userId', '==', userId),
        orderBy('workName'),
        endBefore(this.lastDoc),
        limit(pageSize)
      );
    }
    if (isNextPage === null) {
      ordersQuery = query(
        ordersRef,
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
        // Actualiza lastDoc con el último documento de la página.
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

  saveOrderFile(file: any) {
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
