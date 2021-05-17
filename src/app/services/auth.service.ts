import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertsComponent } from '../components/alerts/alerts.component';
import { getCurrentUser } from '../conections/user/resolver';
import { User } from '../conections/user/response';
import { GraphqlConnectionService } from '../providers/graphql-connection/graphql-connection.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public Authenticated: string;

  constructor(
    private _snackBar: MatSnackBar) { }

  public isAuthenticated() {
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

  public getCurrentUserRole() {
    return localStorage.getItem('currentUserRole');
  }
}
