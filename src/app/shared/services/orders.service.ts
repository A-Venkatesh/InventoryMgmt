import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Coupon } from '../model/coupon';
@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private firestore: AngularFirestore) { }

  // Firestore CRUD actions example
  createOrder(data) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection('orders')
        .add(data)
        .then(res => { }, err => reject(err));
    });
  }

  updateOrder(data, id) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection('Orders')
        .doc(id).update(data).then(res => { }, err => reject(err));
    });
  }

  getOrders() {
    return this.firestore.collection('Orders', ref => ref.orderBy('oid', 'desc'));
  }
  getOrdersWithDate(from, to) {
    // console.log(from + '         ' + to);

    return this.firestore.collection('Orders', ref => ref
      .where('date', '>', from)
      .where('date', '<', to)
      .orderBy('date', 'desc')
      .orderBy('oid', 'desc')).snapshotChanges();
  }

  deleteOrder(data) {
    return this.firestore
      .collection('orders')
      .doc(data.payload.doc.id)
      .delete();
  }

  createCupon(data: Coupon) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection('coupons')
        .doc(data.coupon)
        .set(data)
        .then(res => { }, err => reject(err));
    });
  }
  getCoupons() {
    return this.firestore.collection<Coupon>('coupons');
  }

  deleteCoupon(id) {
    return this.firestore
      .collection('coupons')
      .doc(id)
      .delete();
  }


  updateNotificationToken(data, id) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection('notificationToken')
        .doc(id).set(data).then(res => { }, err => reject(err));
    });
  }
}
