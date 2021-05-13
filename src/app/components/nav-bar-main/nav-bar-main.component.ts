import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav-bar-main',
  templateUrl: './nav-bar-main.component.html',
  styleUrls: ['./nav-bar-main.component.css']
})
export class NavBarMainComponent implements OnInit {

  constructor(private router: Router, private isAuthenticated: AuthService) { }

  ngOnInit(): void {
  }

  onLogout(){
    this.isAuthenticated.setAuthenticated("false");
    if(true){
      this.router.navigate(['/', 'login']);
    }
  }

}
