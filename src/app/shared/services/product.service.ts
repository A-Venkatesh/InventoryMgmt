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
    this.stockUpdate(data.pID, data.variants);
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection("products")
        .add(data)
        .then(res => { }, err => reject(err));
    });
  }

  updateProduct(data, id) {
    this.stockUpdate(data.pID, data.variants)
    return new Promise<any>((resolve, reject) => {
       this.firestore
      .collection("products")
      .doc(id).update(data) .then(res => { }, err => reject(err));
    });
  }

  getProducts() {

    return this.firestore.collection("products").snapshotChanges();

  }

  deleteProduct(id) {
    return this.firestore
      .collection("products")
      .doc(id)
      .delete();
  }

  updateStock(data, id = 'main') {
    return new Promise<any>((resolve, reject) => {
       this.firestore
      .collection("stock")
      .doc(id).update({...data}) .then(res => { }, err => reject(err));
    });
  }
  createStock(data) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection("stock")
        .add({...data})
        .then(res => { }, err => reject(err));
    });
  }
  getStocks() {

    return this.firestore.collection("stock").doc("main").ref.get();

  }
  stockUpdate(pID, variants) {
    let a = this;
    a.getStocks().then(function (doc) {
      if (doc.exists) {
        console.log(doc.data());
        const data = doc.data().data as Array<any>;
        console.log(data);
        
        variants.forEach(element => {
          const id = pID + '_' + element.vID;
          if (data.findIndex(p => p.id === id) > -1) {
            data[data.findIndex(p => p.id === id)] = {
              id: id,
              value: element.availStock
            }
          } else {
            data.push({
              id: id,
              value: element.availStock
            }); 
          }         
        });
        a.updateStock({ data: data });
      } else {
        console.log("There is no document!");
        const data = [];
        variants.forEach(element => {
          data.push({
            id: pID + '_' + element.vID,
            value: element.availStock
          });          
        });
        a.updateStock({ data: data });
      }
    }).catch(function (error) {
      console.log("There was an error getting your document:", error);
    });
  }
}
