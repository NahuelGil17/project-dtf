import { Injectable } from "@angular/core";
import { Firestore, collection, doc, getDoc, getDocs, setDoc } from "@angular/fire/firestore";
import { from } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private fireStore: Firestore) {}

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
