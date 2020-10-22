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

  constructor(private authS: AuthService, private router: Router) {}

  readonly emailOnly = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  ngOnInit(): void {
    this.developerForm = new FormGroup({
      name: new FormControl('Your name', [Validators.required]),
      email: new FormControl('yourname@domain.com', [
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

  submitFunc(): void {
    this.authS
      .signup(this.developerForm.value)
      .then(() => this.router.navigate(['']))
      .catch((err) => alert(err));
  }
}
