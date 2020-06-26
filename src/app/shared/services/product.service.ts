import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private firestore: AngularFirestore) {

  }


  //Firestore CRUD actions example
  createProduct(data) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection("products")
        .add(data)
        .then(res => { }, err => reject(err));
    });
  }

  updateProduct(data) {
    return this.firestore
      .collection("products")
      .doc(data.payload.doc.id)
      .set({ completed: true }, { merge: true });
  }

  getProducts() {

    return this.firestore.collection("products").snapshotChanges();

  }

  deleteProduct(data) {
    return this.firestore
      .collection("products")
      .doc(data.payload.doc.id)
      .delete();
  }
}
