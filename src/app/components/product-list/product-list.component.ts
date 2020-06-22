import { Component, OnInit } from '@angular/core';
import { TranslationService } from "../../shared/services/translation.service";
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  constructor(private ts:TranslationService) { }

  ngOnInit(): void {
    this.ts.getText();
  }
  getTransalation(){
this.ts.getText();
  }

}
