import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TrendService {

  constructor(private firestore: AngularFirestore) {

  }


  // Firestore CRUD actions example
  createTrend(data) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection('trends')
        .add(data)
        .then(res => { }, err => reject(err));
    });
  }

  updateTrend(data, id) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection('trends')
        .doc(id).update(data).then(res => { }, err => reject(err));
    });
  }

  getTrends() {

    return this.firestore.collection('trends').snapshotChanges();

  }

  deleteTrend(id) {
    return this.firestore
      .collection('trends')
      .doc(id)
      .delete();
  }


  updateMenu(data, id = 'main') {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection('menu')
        .doc(id).update({ ...data }).then(res => { }, err => reject(err));
    });
  }
  createMenu(data) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection('menu')
        .add({ ...data })
        .then(res => { }, err => reject(err));
    });
  }
}
