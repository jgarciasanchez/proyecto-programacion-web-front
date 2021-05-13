import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public isAuthenticated() {
    return localStorage.getItem('isAuthenticated');
  }

  public setAuthenticated(state: string) {
    localStorage.setItem('isAuthenticated', state);
  }
}
