import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@core/models/user.models';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public redirectURL: string = '';

  constructor(private http: HttpClient) {}

  public registerUser(user: User) {
    return this.http.post(
      `https://serene-plains-22341.herokuapp.com/api/auth/register`,
      user
    );
  }

  public loginUser(user: User) {
    return this.http.post(
      `https://serene-plains-22341.herokuapp.com/api/auth/login`,
      user
    );
  }

  public logout() {
    localStorage.removeItem('isAuthorized');
    localStorage.removeItem('token');
  }

  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  public getIsAuthorized(): string | null {
    return localStorage.getItem('isAuthorized');
  }
}
