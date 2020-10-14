import { Component, OnInit } from '@angular/core';
import { auth } from 'firebase';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  data: any;
  constructor(private authServer: AuthService) {
    this.getUser();

  }

  ngOnInit(): void {}
  checkLogin() {
    return this.authServer.isLoggedIn;
  }
  logout() {
    return this.authServer.signOut();
  }
  getUser() {
    this.authServer.getUser().subscribe(res => {
     this.data = res.data();
      localStorage.setItem("userData", JSON.stringify(this.data));
    })
  }
}
