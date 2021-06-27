import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, EventEmitter, HostBinding, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { ThemeService } from 'src/app/services/theme.service';
import { UserEditComponent } from '../user-edit/user-edit.component';

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



  constructor(private router: Router, public auth: AuthService, private modalService: NgbModal,
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

  editProfile() {
    const userId = this.auth.getCurrentId();
    const theme = this._currentTheme.getCurrentTheme();
    var modalRef: NgbModalRef;
    if (theme == 'dark') {
      modalRef = this.modalService.open(UserEditComponent, { size: 'lg', centered: true, windowClass: 'dark-modal' });
    } else {
      modalRef = this.modalService.open(UserEditComponent, { size: 'lg', centered: true });
    }
    modalRef.componentInstance.activeModal = modalRef;
    modalRef.componentInstance.userId = userId;
  }

  home() {
    this.router.navigate(['/', 'home']);
  }

  dashboard() {
    this.router.navigate(['admin']);
  }

}
