import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import axios from '../../../../node_modules/axios';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  //  require: any


  constructor(private http: HttpClient) { }

  inTelugu = '';
  async getText(text) {
    // var require: any;
    // const axios = require("axios");
    //console.log('inside service' + text);

    await axios({
      'method': 'GET',
      'url': 'https://translated-mymemory---translation-memory.p.rapidapi.com/api/get',
      'headers': {
        'content-type': 'application/octet-stream',
        'x-rapidapi-host': 'translated-mymemory---translation-memory.p.rapidapi.com',
        'x-rapidapi-key': '8499b29baemsh2b35fe6042fe3c5p1e4141jsn22ca4819ecad',
        'useQueryString': true
      }, 'params': {
        'mt': '1',
        'onlyprivate': '0',
        'de': 'deliveryyaartech@gmail.com',
        'langpair': 'en|te',
        'q': text
      }
    })
      .then((response) => {
        //console.log(response);
        console.log(response.data.responseData.translatedText);
        this.inTelugu = response.data.responseData.translatedText;
      })
      .catch((error) => {
        console.log(error);
      });
  }




}




// var http = require("https");
