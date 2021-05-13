import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class IsAuthenticatedGuard implements CanActivate {
  constructor(private router: Router, private isAuthenticated: AuthService, ) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const state = this.isAuthenticated.isAuthenticated();

    if (state == "true") {
      return true;
    }
    this.router.navigate(['/','login']);
    return false;
  }
}
