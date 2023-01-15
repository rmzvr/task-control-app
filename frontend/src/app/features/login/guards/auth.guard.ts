import { Injectable } from '@angular/core';
import {
  CanLoad,
  Route,
  Router,
} from '@angular/router';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  constructor(private loginService: LoginService, private router: Router) {}

  canLoad(route: Route): boolean {
    return this.isAuthorized(`/${route.path}`);
  }

  isAuthorized(url?: string): boolean {
    if (this.loginService.getIsAuthorized()) {
      return true;
    }

    if (url) {
      this.loginService.redirectURL = url;
    }

    this.router.navigateByUrl('/login');
    return false;
  }
}
