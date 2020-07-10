import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/shared/services/storage.service';
import { TrendService } from 'src/app/shared/services/trend.service';
import { Product } from 'src/app/shared/services/product';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-trend-mgmt',
  templateUrl: './trend-mgmt.component.html',
  styleUrls: ['./trend-mgmt.component.css']
})
export class TrendMgmtComponent implements OnInit {
  tList = [];
  pList = [];
  data = [];
  constructor(private ss: StorageService, private tr: TrendService, private ps: ProductService) { }

  ngOnInit(): void {
    this.tr.getTrends().subscribe(actionArray => {
      this.tList = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data() as Product
        }

      })
      console.log(this.tList);

    });
  }

  reload() {
    let map = new Map();
    this.data = [];
    this.ps.getProducts().subscribe(actionArray => {
      this.pList = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data() as Product
        }
      })

      this.pList.forEach(element => {
        delete element.id;
        const key = element.Category;
        let da = [];
        if (map.has(key)) {
          da = map.get(key);
          da.push(element);
          map.set(key, da);
        } else {
          da.push(element);
          map.set(key, da);
        }
      });

      map.forEach((value: any, key: any) => {
        this.data.push({
          cat: key,
          data: value.slice(0, 5)
        });
      });

      console.log(this.data);
      this.tr.updateMenu(this.data);
      // this.tr.createMenu(this.data);

    });

  }

  delete(id) {
    console.log('Deleted');

    this.tr.deleteTrend(id);
  }


}
