import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '@features/login/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private loginService: LoginService, private router: Router) {}

  public logout(): void {
    this.loginService.logout();

    this.router.navigate(['login']);
  }
}
