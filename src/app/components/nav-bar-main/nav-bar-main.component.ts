import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, EventEmitter, HostBinding, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-nav-bar-main',
  templateUrl: './nav-bar-main.component.html',
  styleUrls: ['./nav-bar-main.component.scss']
})
export class NavBarMainComponent implements OnInit {

  authUser: boolean;
  userName: string;
  language: any;

  @Output()
  readonly darkModeActived = new EventEmitter<boolean>();



  constructor(private router: Router, public auth: AuthService,
    private overlay: OverlayContainer, private _currentTheme: ThemeService) { }

  ngOnInit(): void {
    this.authUser = this.auth.isLogged() == 'true';
    this.userName = this.auth.getCurrentUserName();
  }

  onLogout() {
    this.auth.setAuthenticated("false");
    this.auth.setToken('')
    this.auth.setCurrentId('');
    this.auth.setCurrentUserName('', '');
    this.auth.setCurrentUserRole('');
    this.router.navigate(['/', 'login']);
  }

  onLogin() {
    this.router.navigate(['/', 'login']);
  }

  darkTheme(active: boolean) {
    if (active) {
      this._currentTheme.setCurrenTheme('dark')
    } else {
      this._currentTheme.setCurrenTheme('ligth')
    }
  }

  editProfile(){
    this.router.navigate(['/', 'home']);
  }

  home(){
    this.router.navigate(['/', 'home']);
  }

  dashboard(){
    this.router.navigate(['admin']);
  }

}
