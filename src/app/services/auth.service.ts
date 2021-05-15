import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public Authenticated: string;

  constructor() { }

  public isAuthenticated() {
    return localStorage.getItem('isAuthenticated');
  }

  public setAuthenticated(state: string) {
    this.Authenticated = state;
    localStorage.setItem('isAuthenticated', state);
  }
}
