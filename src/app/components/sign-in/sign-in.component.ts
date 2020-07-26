import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})

export class SignInComponent implements OnInit {
keyWord = 'deliveryyaar';
message = '';
action = '';
  constructor(
    private snackBar: MatSnackBar,
    public authService: AuthService
  ) { }

  ngOnInit() { }

  signinCheck(name: string, pass: string){
if (name.search(this.keyWord) === -1) {
  this.message = ' You dont have admin access';
  this.action = 'Ask Admin';
} else {
  this.message = 'Welcome Back';
  this.action = 'Boss';

  this.authService.SignIn(name, pass);
}
this.openSnackBar(this.message, this.action);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
