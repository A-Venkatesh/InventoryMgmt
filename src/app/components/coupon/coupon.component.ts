import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { MatSnackBar } from '@angular/material';
import { AngularFirestoreCollection } from '@angular/fire/firestore/public_api';
import { Observable } from 'rxjs';
import { Coupon } from 'src/app/shared/model/coupon';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.css']
})
export class CouponComponent implements OnInit {

  cType = ['All', 'Categories', 'Products'];
  dType = ['Percentage', 'Fixed', 'Shipping']
  cForm = this.fb.group({
    coupon: ['', [Validators.required]],
    CType: ['All', [Validators.required]],
    DType: ['', [Validators.required]],
    List: [''],
    MinCart: ['', [Validators.required]],
    Amount: ['', [Validators.min(1), Validators.pattern('^\\d+$')]],
    Percent: ['', [Validators.min(1), Validators.max(100), Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')]],
    SType: [true],
  });
  private itemsCollection: AngularFirestoreCollection<Coupon>;
  items: Observable<Coupon[]>;


  constructor(private snackBar: MatSnackBar, private fb: FormBuilder, private os: OrdersService) {
    this.itemsCollection = this.os.getCoupons();
    this.items = this.itemsCollection.valueChanges();
    console.log(this.items);
    // this.itemsCollection.
  }

  ngOnInit(): void {


  }
  getThis(item) {
    console.log(typeof (item));
    console.log(item);


    return item.coupon;
  }
  onSubmit() {
    const oj = this.cForm.value as Coupon;
    console.log(oj);
    console.log(JSON.stringify(oj));

    if (this.cForm.valid) {
      let ar = oj.List;
      console.log(ar);
      if (ar.length > 0) {
        console.log(ar.search(','));
        if (ar.search(',') !== -1) {
          const arr = ar.split(',');
          ar = arr;
          console.log(ar);
        }
      }
      oj.List = ar;
      this.os.createCupon(oj);
      console.log(oj);
    } else {
      this.openSnackBar('invalid feed');
    }

  }
  onChangeVariants(event) {

  }
  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 2000,
    });
  }

  delete(id) {
    this.os.deleteOrder(id);
  }
}
