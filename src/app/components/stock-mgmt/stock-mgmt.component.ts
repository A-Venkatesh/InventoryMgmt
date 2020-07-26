import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { Product } from 'src/app/shared/model/product';

@Component({
  selector: 'app-stock-mgmt',
  templateUrl: './stock-mgmt.component.html',
  styleUrls: ['./stock-mgmt.component.css']
})
export class StockMgmtComponent implements OnInit {
  list = [];
  displayStock: Array<any>;
  count = [];
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
        };
      });
      this.ss.nextStocks(temp[0].data);
      this.retriveDisplay(temp[0].data);
    });


  }
  retriveDisplay(data) {
    const list = this.list;
    const displayStock = [];
    // this.displayStock = [];
    data.forEach(element => {
      const index = element.id.indexOf('_');
      const id = element.id;
      const fID = id.substr(0, index);
      const vID = id.substr(index + 1, id.length);
      // console.log('fid :' + fID + '  vid  :' + vID);
      const prod = list.find(p => p.id === fID);
      try {
        const row = {
          pID: prod.pID,
          name: prod.ProductName,
          variant: prod.variants[vID].quantity + ' ' + prod.variants[vID].metric,
          stock: element.value
        };

        displayStock.push(row);
      } catch (error) {
        console.log('Error  :  fid :' + fID + '  vid  :' + vID);
      }
    });

    this.setData(displayStock);


  }

  setData(display) {
    this.displayStock = display;

    this.count[0] = display.filter(p => Number(p.stock) < 1).length;
    this.count[1] = display.filter(p => Number(p.stock) > 1 && Number(p.stock) < 11).length;
    this.count[2] = display.filter(p => Number(p.stock) > 11).length;
    // console.log(this.count);

  }

}
