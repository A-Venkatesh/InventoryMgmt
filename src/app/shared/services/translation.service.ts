import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  //  require: any


  constructor(private http: HttpClient) { }

  // getText(text){
  //   const headers = new HttpHeaders({ 'x-rapidapi-host': 'microsoft-translator-text.p.rapidapi.com',
  //   'x-rapidapi-key': '8499b29baemsh2b35fe6042fe3c5p1e4141jsn22ca4819ecad',
  //   'content-type': 'application/json',
  //   'accept': 'application/json',
  //   'useQueryString': 'true' });
  //   const body = { Text: text };

  //   this.http.post<any>('http://microsoft-translator-text.p.rapidapi.com/translate?profanityAction=NoAction&textType=plain&to=te&api-version=3.0', body, { headers }).subscribe(data => {
  //     console.log(data);

  // })
  // }
  inTelugu = '';
  async getText(text) {
    // var require: any;
    const axios = require("axios");
    console.log('inside service' + text);

    await axios({
      "method": "GET",
      "url": "https://translated-mymemory---translation-memory.p.rapidapi.com/api/get",
      "headers": {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "translated-mymemory---translation-memory.p.rapidapi.com",
        "x-rapidapi-key": "8499b29baemsh2b35fe6042fe3c5p1e4141jsn22ca4819ecad",
        "useQueryString": true
      }, "params": {
        "mt": "1",
        "onlyprivate": "0",
        "de": "deliveryyaartech@gmail.com",
        "langpair": "en|te",
        "q": text
      }
    })
      .then((response) => {
        console.log(response)
        console.log(response.data.responseData.translatedText)
        this.inTelugu = response.data.responseData.translatedText;
      })
      .catch((error) => {
        console.log(error)
      })
  }




}




//var http = require("https");