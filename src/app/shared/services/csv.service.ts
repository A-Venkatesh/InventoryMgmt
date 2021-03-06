import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
// import { Timestamp } from "@firebase/firestore-types";


@Injectable({
  providedIn: 'root'
})
export class CsvService {

  constructor() { }

  downloadFile(data, filename = 'data') {

    const csvData = this.ConvertToCSV(data, ['uid',
      'oid',
      'status',
      'date',
      'paySts',
      'payType',
      'name',
      'phone',
      'cartValue',
      'shippingCharge',
      'total',
      'qty',
      'save',
    ]);
    // 'location',    'order',    'address',
    // console.log(csvData)
    const blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
    const dwldLink = document.createElement('a');
    const url = URL.createObjectURL(blob);
    const isSafariBrowser = navigator.userAgent.indexOf('Safari') !== -1 && navigator.userAgent.indexOf('Chrome') === -1;
    if (isSafariBrowser) {  // if Safari open in new window to save file with random filename.
      dwldLink.setAttribute('target', '_blank');
    }
    dwldLink.setAttribute('href', url);
    dwldLink.setAttribute('download', filename + '.csv');
    dwldLink.style.visibility = 'hidden';
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
  }

  ConvertToCSV(objArray, headerList) {
    const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    let row = 'S.No,';

    // tslint:disable-next-line: forin
    for (const index in headerList) {
      row += headerList[index] + ',';
    }
    row = row.slice(0, -1);
    str += row + '\r\n';
    for (let i = 0; i < array.length; i++) {
      let line = (i + 1) + '';
      // tslint:disable-next-line: forin
      for (const index in headerList) {
        const head = headerList[index];
        let content = array[i][head];
        if (typeof (content) !== 'string') {
          content = JSON.stringify(content);
        }
        if (head === 'date') {
          const t = new Date(1970, 0, 1); // Epoch
          console.log(JSON.parse(content));

          t.setSeconds(JSON.parse(content).seconds);
          content = t.toLocaleDateString().concat(' ' + t.toLocaleTimeString());
        }
        line += ',' + content;
      }
      str += line + '\r\n';
    }
    return str;
  }
}
