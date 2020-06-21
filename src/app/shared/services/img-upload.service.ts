import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from  '@angular/common/http';
import { map } from  'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImgUploadService {

  uri = 'https://api.imgbb.com/1/upload';
  key = '6ed3942e8c6f6f9a839e4e1e93cfe787';
  prog ='';

  constructor(private http: HttpClient) { }

  addImages(fileData: any , name: string) {
    console.log('00000000000'+ fileData);
    return this.http.post(`${this.uri}` + '?key=' + this.key, fileData , {
      reportProgress: true,
      observe: 'events'
    }).pipe(map((event) => {

      switch (event.type) {

        case HttpEventType.UploadProgress:
          console.log(event);
          
          const progress = Math.round(100 * event.loaded / event.total);
          return { fname: name , status: 'progress', message: progress };

        case HttpEventType.Response:
          return event.body;
        default:
          return `Unhandled event: ${event.type}`;
      }
    })
    );

  }
}