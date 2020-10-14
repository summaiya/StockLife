import { Component, OnInit } from '@angular/core';
import { auth } from 'firebase';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(private authServer: AuthService) {}

  ngOnInit(): void {}
  checkLogin() {
    return this.authServer.isLoggedIn;
  }
  logout() {
    return this.authServer.signOut();
  }
}
