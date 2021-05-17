import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav-bar-main',
  templateUrl: './nav-bar-main.component.html',
  styleUrls: ['./nav-bar-main.component.css']
})
export class NavBarMainComponent implements OnInit {

  authUser: boolean;

  constructor(private router: Router, public auth: AuthService) { }

  ngOnInit(): void {
    this.authUser = (this.auth.isAuthenticated() == 'true');
  }

  onLogout() {
    this.auth.setAuthenticated("false");
    this.auth.setToken('')
    this.router.navigate(['/', 'login']);
  }

  onLogin() {
    this.router.navigate(['/', 'login']);
  }

}
