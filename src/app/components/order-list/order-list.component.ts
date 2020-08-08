import { Component, OnInit, ViewChild } from '@angular/core';
import { OrdersService } from '../../shared/services/orders.service';
import { Product } from 'src/app/shared/model/product';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Order } from 'src/app/shared/model/order';
import { CsvService } from 'src/app/shared/services/csv.service';


@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html', animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  public columnsToDisplay = ['oid', 'date', 'status'];
  public colums = ['ID', 'Name', 'LName'];
  list = [];

  expandedElement: Product | null;
  public dataSource = new MatTableDataSource<Product>(this.list);

  constructor(private ordersService: OrdersService, private csv: CsvService) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  ngOnInit() {
    const events = this.ordersService.getOrders();
    events.get().toPromise().then((querySnapshot) => {
      this.list = [];
      querySnapshot.forEach((doc) => {
        const id = doc.id;
        this.list.push({ id, ...doc.data() as Order });
      });
      this.setData();
    });
  }

  setData() {

    this.dataSource = new MatTableDataSource<Product>(this.list);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getMapURL(location) {
    if (location !== undefined) {
      return 'https://www.google.com/maps/search/?api=1&query='.concat(location.lat).concat(',' + location.log);
    } else {
      return ' ';
    }

  }

  download() {
    //console.log('Download methord');
    const now = new Date();
    //console.log(now.toLocaleDateString());
    this.csv.downloadFile(this.dataSource.filteredData, 'Orders' + now.toLocaleDateString());
  }

}
