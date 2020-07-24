import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';




@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private firestore: AngularFirestore) {

  }


  //Firestore CRUD actions example
  createProduct(data, id) {

    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection("products")
        .doc(id + '')
        .set(data)
        .then(docRef => {
          resolve('Sucess')
          this.stockUpdate(id, data.variants);
        }, err => reject(err));
    });
  }

  increasePID(id) {
    const countRef = this.firestore.collection("counter").doc("product");

    countRef.update({
      pid: 1 + id
    });
  }

  getPID() {
    const countRef = this.firestore.collection("counter").doc("product");
    return new Promise<any>((resolve, reject) => {
      countRef.get().toPromise().then(doc => {
        if (doc.exists) {
          const pid = doc.data();
          console.log("Document data:", pid);

          resolve(pid)

        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
          reject('no id')
        }
      }).catch(function (error) {
        console.log("Error getting document:", error);
      });
    });
  }

  updateProduct(data, id) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection("products")
        .doc(id).update(data).then(res => {
          resolve('sucess');
          this.stockUpdate(id, data.variants)
        }, err => reject(err));
    });
  }

  getProducts() {

    return this.firestore.collection("products", ref => ref.orderBy('pID', 'desc')).snapshotChanges();

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
        .doc(id).update({ ...data }).then(res => { }, err => reject(err));
    });
  }
  createStock(data) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection("stock")
        .add({ ...data })
        .then(res => { }, err => reject(err));
    });
  }
  getStocks() {

    return this.firestore.collection("stock").doc("main").ref.get();

  }
  getStocksManyTime() {

    return this.firestore.collection("stock").snapshotChanges();

  }
  stockUpdate(fID, variants) {
    let a = this;
    a.getStocks().then(function (doc) {
      if (doc.exists) {
        console.log(doc.data());
        const data = doc.data().data as Array<any>;
        console.log(data);

        variants.forEach(element => {
          const id = fID + '_' + element.vID;
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
            id: fID + '_' + element.vID,
            value: element.availStock
          });
        });
        a.updateStock({ data: data });
      }
    }).catch(function (error) {
      console.log("There was an error getting your document:", error);
    });
  }

  deleteStock(fID, no, stocks: Array<any>) {
    for (let vID = 0; vID < no; vID++) {
      const id = fID + '_' + vID;

      const ind = stocks.findIndex(p => p.id === id);
      if (ind > -1) {
        stocks.splice(ind, 1);
      }
    }
    this.updateStock({data: stocks});
  }
}
