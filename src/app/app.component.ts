import { Component, OnInit} from '@angular/core';
import { AuthService } from "./auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Inventory';
  constructor(public authService: AuthService) { }

  ngOnInit(){

    if (localStorage.getItem('looged') === null) {
      localStorage.setItem('looged', 'no' );
    }   
    
  }
  logCheck(){
    if (localStorage.getItem('looged') === 'yes') {
      return true;
    } else {  
      return false;
    }
  }
}
