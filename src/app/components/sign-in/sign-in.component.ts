import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { rejects } from 'assert';
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

  signinCheck(name: string, pass: string) {
    if (!name.toLowerCase().startsWith(this.keyWord)) {
      this.message = ' You dont have admin access';
      this.action = 'Ask Admin';
      this.openSnackBar(this.message, this.action);
    } else {
      this.authService.SignIn(name.toLowerCase(), pass).then(resolve => {
        this.message = 'Welcome Back';
        this.action = 'Boss';
        this.openSnackBar(this.message, this.action);
      },
        reject => {
          this.message = 'Sorry...';
          this.action = 'Try Again';
          this.openSnackBar(this.message, this.action);
        }
      );
    }

  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
