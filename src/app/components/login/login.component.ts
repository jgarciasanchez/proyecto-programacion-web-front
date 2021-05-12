import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  playerName: string;

  constructor(private router: Router) {
    }

  iniciarSesion(password: string, username:string) {
    console.log(password + ' ' + username);
    if(true){
      this.router.navigate(['/', 'Home']);
    }
  }

}
