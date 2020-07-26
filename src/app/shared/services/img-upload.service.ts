import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { img } from '../../../DY/imgBB_API';

@Injectable({
  providedIn: 'root'
})
export class ImgUploadService {

  uri = 'https://api.imgbb.com/1/upload';
  key = img.key;
  prog = '';

  constructor(private http: HttpClient) { }

  addImages(fileData: any, name: string) {

    return this.http.post(`${this.uri}` + '?key=' + this.key, fileData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(map((event) => {

      switch (event.type) {

        case HttpEventType.UploadProgress:
          // console.log(event);

          const progress = Math.round(100 * event.loaded / event.total);
          return { fname: name, status: 'progress', message: progress };

        case HttpEventType.Response:
          return event.body;
        default:
          return `Unhandled event: ${event.type}`;
      }
    })
    );

  }
}
