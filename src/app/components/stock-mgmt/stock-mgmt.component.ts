import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { Product } from 'src/app/shared/services/product';

@Component({
  selector: 'app-stock-mgmt',
  templateUrl: './stock-mgmt.component.html',
  styleUrls: ['./stock-mgmt.component.css']
})
export class StockMgmtComponent implements OnInit {
  list = [];
  displayStock: Array<any>;
  count =[];
  constructor(public ss: StorageService, private ps: ProductService) { }
  ngOnInit(): void {
    this.ss.sharedData.subscribe(storage => {
      this.list = storage;
    });

    this.ps.getStocksManyTime().subscribe(actionArray => {
      const temp = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data() as { data: any }
        }
      })
      this.retriveDisplay(temp[0].data);
    });


  }
  retriveDisplay(data) {
    const list = this.list;
    const displayStock = [];
    // this.displayStock = [];
    data.forEach(element => {
      const fID = element.id.substr(0, 20);
      const vID = element.id.substr(21, 22);
      console.log('fid :' + fID + '  vid  :' + vID);
      const prod = list.find(p => p.id === fID);
      const row = {
        pID: prod.pID,
        name: prod.ProductName,
        variant: prod.variants[vID].quantity + ' ' + prod.variants[vID].metric,
        stock: element.value
      }

      displayStock.push(row);
    });

    this.setData(displayStock);


  }

  setData(display) {
    this.displayStock = display;
    
    this.count[0] = display.filter(p => Number(p.stock) < 1).length;
    this.count[1] = display.filter(p => Number(p.stock) > 1 && Number(p.stock) < 11).length;
    this.count[2] = display.filter(p => Number(p.stock) > 11).length;
    console.log(this.count);
    
  }

}
