importScripts('https://www.gstatic.com/firebasejs/8.0.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.0.0/firebase-messaging.js');
// import { environment } from '../environments/environment';
firebase.initializeApp({
    apiKey: "AIzaSyD9Gv-VlsppquN1cQD_BsXYnf4yuhsTgWA",
    authDomain: "dy-proj.firebaseapp.com",
    databaseURL: "https://dy-proj.firebaseio.com",
    projectId: "dy-proj",
    storageBucket: "dy-proj.appspot.com",
    messagingSenderId: "660343636392",
    appId: "1:660343636392:web:e33eee7e3d39fa5322dd9d",
    measurementId: "G-20X67CTLVL"
  });

const messaging = firebase.messaging();