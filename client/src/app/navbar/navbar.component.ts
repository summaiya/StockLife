import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  data: any;
  isLoggedIn$: Observable<boolean>;

  constructor(private authServer: AuthService) {
    this.authServer.getUser();
    this.subscribeToUser();
  }

  ngOnInit(): void {
    this.isLoggedIn$ = this.authServer.isLoggedIn;
  }

  logout(): Promise<void> {
    return this.authServer.signOut();
  }

  subscribeToUser(): void {
    this.authServer.user.asObservable().subscribe((res) => {
      if (res) {
        this.data = res;
        localStorage.setItem('userData', JSON.stringify(this.data));
      }
    });
  }
}
