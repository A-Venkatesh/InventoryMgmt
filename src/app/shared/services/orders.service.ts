import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private firestore: AngularFirestore) {}

  //Firestore CRUD actions example
  createOrder(data) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection("orders")
        .add(data)
        .then(res => {}, err => reject(err));
    });
  }

  updateOrder(data) {
    return this.firestore
      .collection("orders")
      .doc(data.payload.doc.id)
      .set({ completed: true }, { merge: true });
  }

  getOrders() {
    return this.firestore.collection("Orders").snapshotChanges();
  }

  deleteOrder(data) {
    return this.firestore
      .collection("orders")
      .doc(data.payload.doc.id)
      .delete();
  }
}
