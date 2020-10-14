import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  readonly emailOnly = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  isValidateTextTrue(data: any) {
    if (data.touched && data.valid) {
      return true;
    } else {
      return false;
    }
  }
  isValidateTextFalse(data: any) {
    if (data.touched && data.invalid) {
      return true;
    } else {
      return false;
    }
  }
  submitFunc(data: any, event: Event) {
    event.preventDefault();
    const { value } = data;
    this.authS
      .signin(value.email, value.password)
      .then((arg) => {})
      .catch((err) => {
        alert(err.message);
      });
  }
  constructor(private route: Router, private authS: AuthService) {}
  ngOnInit(): void {}
}
