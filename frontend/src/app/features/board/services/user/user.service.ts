import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  public getUser() {
    return this.http.get(`https://serene-plains-22341.herokuapp.com/api/user`);
  }
}
