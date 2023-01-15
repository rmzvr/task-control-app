import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '@features/login/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private router: Router, private loginService: LoginService) {}

  public logout(): void {
    this.loginService.logout();

    this.router.navigate(['login']);
  }
}
