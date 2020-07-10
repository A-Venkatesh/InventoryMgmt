import { Injectable } from '@angular/core';
import { Product } from './product';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private list: Product[];
  private _storage = new BehaviorSubject<Product[]>(this.list);
  public get storage() {
    return this._storage;
  }
  public set storage(value) {
    this._storage = value;
  }
  sharedData = this._storage.asObservable();

  nextData(storage: Product[]) {
    this._storage.next(storage);
  }

  constructor() { }
  private tList: Product[];
  private _trends = new BehaviorSubject<Product[]>(this.tList);
  public get trends() {
    return this._trends;
  }
  public set trends(value) {
    this._trends = value;
  }
  sharedTrend = this._trends.asObservable();

  nextTrend(trends: Product[]) {
    this._trends.next(trends);
  }
}
