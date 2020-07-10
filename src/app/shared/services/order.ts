export interface Order {
    uid: string;
  oid: string;
  order: Array<any>;
  status: string;
  date: any;
  address: string;
  location: {
    lat: string,
    log: string,
    zoom: string
  };
  paySts: false;
  payType: string;
  name: string;
  phone: string;
  cartValue: number;
  shippingCharge: number;
  total: number;
  qty: number;
  save: number;
}