import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {


  constructor(private http:HttpClient) { }
  
  getText(){
    const headers = new HttpHeaders({ 'x-rapidapi-host': 'microsoft-translator-text.p.rapidapi.com',
    'x-rapidapi-key': '8499b29baemsh2b35fe6042fe3c5p1e4141jsn22ca4819ecad',
    'content-type': 'application/json',
    'accept': 'application/json',
    'useQueryString': 'true' });
    const body = { Text: 'Angular POST Request Example' };

    this.http.post<any>('http://microsoft-translator-text.p.rapidapi.com/translate?profanityAction=NoAction&textType=plain&to=te&api-version=3.0', body, { headers }).subscribe(data => {
      console.log(data);
      
  })
  }
  
}




//var http = require("https");