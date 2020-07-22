import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../shared/services/orders.service';
import { NgForm } from "@angular/forms";
import { Order } from 'src/app/shared/services/order';
import { getLocaleDateFormat } from '@angular/common';
import { MatDatepickerInputEvent } from '@angular/material';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders = [];
  new: any[];
  inP: any[];
  out: any[];
  done: any[];
  toDate = new Date();
  fromDate = this.getDate(7);
  constructor(public ordersService: OrdersService) { }

  ngOnInit() {

    this.getDataFromDB()
    console.log(this.orders);

  }
  getDate(days) {
    return new Date(this.toDate.getTime() - (days * 24 * 60 * 60 * 1000));
  }
  changeDate(type: string, event: MatDatepickerInputEvent<Date>) {
    // this.events.push(`${type}: ${event.value}`);
    // switch (type) {
    //   case 'from':
    //     // console.log(typeof(event.value));
    //     this.fromDate = event.value;

    //     break;

    //   case 'to':
    //     this.toDate = event.value;
    //     break;

    //   default:
    //     break;
    // }
    console.log(this.toDate);
    
  }
  getDataFromDB() {
    console.log('inside get data');
    this.ordersService.getOrdersWithDate(this.fromDate, this.toDate).subscribe(res => {
      this.orders = [];
      res.forEach(element => {
        let id = element.payload.doc.id;
        this.orders.push({ id, ...element.payload.doc.data() as Order });
        this.setValue();
      });
    });
  }
  setValue() {
    this.new = this.orders.filter(o => o.status === 'init' || o.status === 'Order Placed');
    this.inP = this.orders.filter(o => o.status === 'In-Progress');
    this.out = this.orders.filter(o => o.status === 'Out for Delivery');
    this.done = this.orders.filter(o => o.status === 'Completed');
  }
  getMapURL(location) {
    if (location !== undefined) {
      return 'https://www.google.com/maps/search/?api=1&query='.concat(location.lat).concat(',' + location.log);
    } else {
      return ' ';
    }

  }
  onValChange(value, oid) {
    console.log(value, oid);
    const data = this.orders.find(o => o.oid === oid);
    data.status = value;
    console.log(data);
    console.log(data.id);

    this.ordersService.updateOrder(data, data.id).then(res => {
      /*do something here....maybe clear the form or give a success message*/
      console.log(res);
      // this.setValue();

    });

  }

}
