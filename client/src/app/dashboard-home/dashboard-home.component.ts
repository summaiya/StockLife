import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css'],
})
export class DashboardHomeComponent implements OnInit {
  constructor(private AuthS: AuthService, private router: Router) {
    if (!AuthS.isLoggedIn) {
      this.router.navigate(['login']);
    } else {
      this.router.navigate(['dashboard']);
    }
  }

  ngOnInit(): void {}
}
