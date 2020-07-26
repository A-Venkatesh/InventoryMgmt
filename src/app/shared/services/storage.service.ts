import { Injectable } from '@angular/core';
import { Product } from './product';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  public get storage() {
    return this._storage;
  }
  public set storage(value) {
    this._storage = value;
  }

  constructor() { }
  public get trends() {
    return this._trends;
  }
  public set trends(value) {
    this._trends = value;
  }
  public get stocks_1() {
    return this._stocks;
  }
  public set stocks_1(value) {
    this._stocks = value;
  }
  private list: Product[];
  private _storage = new BehaviorSubject<Product[]>(this.list);
  sharedData = this._storage.asObservable();
  private tList: Product[];
  private _trends = new BehaviorSubject<Product[]>(this.tList);
  sharedTrend = this._trends.asObservable();



  private stock = [];
  private _stocks = new BehaviorSubject<any>(this.stock);
  sharedStocks = this._stocks.asObservable();

  nextData(storage: Product[]) {
    this._storage.next(storage);
  }

  nextTrend(trends: Product[]) {
    this._trends.next(trends);
  }

  nextStocks(stocks: any) {
    this._stocks.next(stocks);
  }
}
