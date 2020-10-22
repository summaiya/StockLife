import { Component } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  readonly emailOnly = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  isValidateTextTrue(data: any): boolean {
    if (data.touched && data.valid) {
      return true;
    } else {
      return false;
    }
  }

  isValidateTextFalse(data: any): boolean {
    if (data.touched && data.invalid) {
      return true;
    } else {
      return false;
    }
  }

  submitFunc(data: any, event: Event): void {
    event.preventDefault();
    const { value } = data;
    this.authS
      .signin(value.email, value.password)
      .then(() => { })
      .catch((err) => {
        alert(err.message);
      });
  }

  constructor(private authS: AuthService) { }
}
