import { Component, OnInit, ViewChild } from '@angular/core';
import { StorageService } from 'src/app/shared/services/storage.service';
import { Product } from "src/app/shared/services/product";
import { ProductService } from 'src/app/shared/services/product.service';
import { MatTableDataSource, MatPaginator, MatSlideToggleChange } from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatSort } from '@angular/material/sort';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Router } from '@angular/router';
import { TrendService } from 'src/app/shared/services/trend.service';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html', animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  public columnsToDisplay = [];
  public colums = ['ID', 'Name', 'LName', 'Brand', 'Variants', 'Category', 'SubCategory'];

  list = [];
  keyP = [];
  public isMobilevar = false;
  public isDesktopvar = false;
  // dataSource = ELEMENT_DATA;
  // columnsToDisplay = ['name', 'weight', 'symbol', 'position'];
  expandedElement: Product | null;
  public dataSource = new MatTableDataSource<Product>(this.list);


  constructor(private router: Router, public ss: StorageService, private ps: ProductService, private deviceService: DeviceDetectorService, private tr: TrendService) {
    this.isMobile();
    this.isDesktop();
    if (this.isDesktopvar) {
      this.columnsToDisplay = ['pID', "ProductName", "ProductLocalName", 'ProductOwner', 'numberOfVariants', 'Category', 'SubCategory'];

    } else {
      this.columnsToDisplay = ['pID', "ProductName", "ProductLocalName", 'ProductOwner', 'numberOfVariants'];

    }
    this.ss.sharedData.subscribe(storage => {
      this.list = storage;
      // console.log(JSON.stringify('size' + this.list.length));
    });
    this.keyP = [];
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit(): void {
    this.ps.getProducts().subscribe(actionArray => {
      this.list = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data() as Product
        }
      })
      this.setData();
    });
    this.tr.getTrends().subscribe(actionArray => {
      this.keyP = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data() as Product
        }
      })
// this.ss.nextTrend(this.keyP);
    });



  }

  setData() {

    this.dataSource = new MatTableDataSource<Product>(this.list);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    console.log(this.list);

    this.ss.nextData(this.list);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  // getData() {
  //   this.ss.sharedData.subscribe(storage => {
  //     this.list = storage;
  //     console.log(JSON.stringify('size' + this.list.length));
  //   });

  // }
  public redirectToDetails = (id: string) => {

  }

  public redirectToUpdate = (id: string) => {

  }

  public redirectToDelete = (id: string) => {

  }

  public isDesktop() {
    this.isDesktopvar = this.deviceService.isDesktop();
  }
  public isMobile() {
    this.isMobilevar = this.deviceService.isMobile();
  }

  onEdit(id: string) {
    this.router.navigate(['dashboard/edit', id]);
  }
  onDelete(id: string) {
    console.log(id);

    this.ps.deleteProduct(id).then(res => {
      /*do something here....maybe clear the form or give a success message*/
      console.log(res);

    });

  }

  value(id) {
    if (this.keyP.findIndex(p => p.pID === id) > -1) {

      return true;
    } else {
      return false;
    }

  }
  setTrend($event: MatSlideToggleChange, id) {

    console.log(id);
    console.log($event);
    if ($event.checked) {
      let data = this.list.find(p => p.id === id);
      delete data.id;
      console.log(data);
      
      this.tr.createTrend(data);
      // this.keyP.push(this.list.find(p=> p.id === id))
    } else {
      // this.keyP.splice(this.list.indexOf(p => p.id === id), 1)
      console.log(this.keyP.find(p => p.pID === this.list.find(p => p.id === id).pID).id);
      
      this.tr.deleteTrend(this.keyP.find(p => p.pID === this.list.find(p => p.id === id).pID).id);
    }
    console.log(this.keyP);

  }
}
