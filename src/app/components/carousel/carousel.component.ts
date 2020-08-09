import { ProductService } from 'src/app/shared/services/product.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize, filter, first } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface AD {
  key: string;
  value: string;
}

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  ads: Array<AD> = [];
  constructor(private storage: AngularFireStorage, private ps: ProductService) {
    for (let index = 0; index < 3; index++) {
      // const element = array[index];
      this.ads.push({
        key: '', value: ''
      });
    }
  }
  ngOnInit() {
    this.ps.getAd().get().toPromise().then((doc) => {
      if (doc.exists) {
        console.log('Document data:', doc.data());
        this.ads = doc.data().ads;
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
      }
    }).catch((error) => {
      console.log('Error getting document:', error);
    });
  }

  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = 'ad/' + file.name;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
      finalize(() => this.downloadURL = fileRef.getDownloadURL())
    )
      .subscribe();
  }

  modifyAd() {
    const data = { ads: this.ads };
    this.ps.updateAd(data);
  }
  copyMessage() {

    this.getValue(this.downloadURL).then(doc => {
      const selBox = document.createElement('textarea');
      selBox.style.position = 'fixed';
      selBox.style.left = '0';
      selBox.style.top = '0';
      selBox.style.opacity = '0';
      selBox.value = doc;
      document.body.appendChild(selBox);
      selBox.focus();
      selBox.select();
      document.execCommand('copy');
      document.body.removeChild(selBox);

    });
  }

  hasValue(value: any) {
    return value !== null && value !== undefined;
  }

  getValue<T>(observable: Observable<T>): Promise<T> {
    return observable
      .pipe(
        filter(this.hasValue),
        first()
      )
      .toPromise();
  }
}
