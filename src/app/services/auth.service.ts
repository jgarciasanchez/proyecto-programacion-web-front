import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public Authenticated: string;

  constructor(
    private _snackBar: MatSnackBar) { }

  public isLogged() {
    return localStorage.getItem('isAuthenticated');
  }

  public setAuthenticated(state: string) {
    this.Authenticated = state;
    localStorage.setItem('isAuthenticated', state);
  }

  public getToken() {
    return localStorage.getItem('token');
  }

  public setToken(state: string) {
    this.Authenticated = state;
    localStorage.setItem('token', state);
  }

  public async setCurrentUserRole(role: string) {
    localStorage.setItem('currentUserRole', role);
  }

  public async setCurrentUserName(name: string, lastName: string) {
    localStorage.setItem('currentUserName', name + " " + lastName);
  }

  public async setCurrentId(id: string) {
    localStorage.setItem('currentId', id);
  }

  public getCurrentId() {
    return localStorage.getItem('currentId');
  }

  public getCurrentUserName() {
    return localStorage.getItem('currentUserName');
  }

  public getCurrentUserRole() {
    return localStorage.getItem('currentUserRole');
  }

  public setCurrentService(id: string){
    localStorage.setItem('currentServiceId', id);
  }
  
  public getCurrentService() {
    return localStorage.getItem('currentServiceId');
  }
}
