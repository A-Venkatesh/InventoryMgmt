import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Inventory';
  constructor(public authService: AuthService) { }

  ngOnInit() {

  }
  logCheck() {
    if (this.authService.isLoggedIn) {
      return true;
    } else {
      return false;
    }
  }
}
