import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class IsLoggedGuard implements CanActivate {
  constructor(private router: Router, private isAuthenticated: AuthService, ) {}


  canActivate(route: ActivatedRouteSnapshot): boolean {
    const state = this.isAuthenticated.isLogged();

    if (state == "true") {

      if (route.routeConfig.path === 'login' || route.routeConfig.path === 'register') {
        this.router.navigate(['/','home']);
      } else {
        return true;
      }
    }
    return false;
  }


}
