import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent implements OnInit {
  Roles: any = ['Admin', 'Author', 'Reader'];
  selected = '';
  constructor(
    public authService: AuthService
  ) { }

  ngOnInit() { }

}
