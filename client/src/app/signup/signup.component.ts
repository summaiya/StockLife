import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  developerForm: FormGroup;
  /**
   *
   */
  constructor(private authS: AuthService, private router: Router) {}
  readonly emailOnly = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  ngOnInit(): void {
    this.developerForm = new FormGroup({
      name: new FormControl('asdasd', [Validators.required]),
      email: new FormControl('asasdasd@email.com', [
        Validators.pattern(this.emailOnly),
        Validators.required,
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.maxLength(15),
        Validators.minLength(8),
      ]),
    });
  }

  submitFunc() {
    this.authS
      .signup(this.developerForm.value)
      .then((res) => this.router.navigate(['dashboard']))
      .catch((err) => alert(err));
  }
}
