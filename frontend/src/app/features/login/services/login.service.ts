import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public redirectURL: string = '';

  constructor(private http: HttpClient) {}

  public registerUser(user: any) {
    return this.http.post(
      `https://serene-plains-22341.herokuapp.com/api/auth/register`,
      user
    );
  }

  public loginUser(user: any) {
    return this.http
      .post(`https://serene-plains-22341.herokuapp.com/api/auth/login`, user)
      .pipe(
        tap((res: any) => {
          localStorage.setItem('token', res.jwt_token);
          localStorage.setItem('isAuthorized', 'true');
        })
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
