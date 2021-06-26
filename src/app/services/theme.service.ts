import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor() { }

  public async setCurrenTheme(currentTheme: string) {
    localStorage.setItem('currentTheme', currentTheme);
  }
  
  public getCurrentTheme() {
    return localStorage.getItem('currentTheme');
  }
}
