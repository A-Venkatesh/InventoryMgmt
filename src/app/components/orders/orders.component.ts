import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../shared/services/orders.service';
import { NgForm } from "@angular/forms";
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: any;
  constructor(public ordersService: OrdersService) {}

  ngOnInit() {
    this.orders = this.ordersService.getOrders();
    console.log(this.orders);
    
  }

}
