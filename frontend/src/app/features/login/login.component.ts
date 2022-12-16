import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, of, tap, timeout } from 'rxjs';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public isLoginForm: boolean = true;

  public loginForm: FormGroup;

  public isSnackVisible: boolean = false;

  public message!: string;
  public type!: string;

  constructor(private loginService: LoginService, private router: Router) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  public toggleForms(): void {
    this.isLoginForm = !this.isLoginForm;
    this.loginForm.reset();
  }

  public register(event: Event): void {
    event.preventDefault();

    if (this.loginForm.status === 'INVALID') {
      return;
    }

    this.loginService
      .registerUser(this.loginForm.value)
      .pipe(
        tap((res: any) => {
          this.loginForm.reset();
          this.toggleForms();
          this.message = res?.message;
          this.type = 'success';
          this.showSnackbar();
        }),
        catchError((err: any) =>
          of(err).pipe(
            tap(({ error }) => {
              this.message = 'User already exist';
              this.type = 'error';
              this.showSnackbar();
            })
          )
        )
      )
      .subscribe();
  }

  public login(event: Event): void {
    event.preventDefault();

    if (this.loginForm.status === 'INVALID') {
      return;
    }

    this.loginService
      .loginUser(this.loginForm.value)
      .pipe(
        tap(() => {
          this.loginForm.reset();
          this.router.navigate(['dashboard']);
        }),
        catchError((err: any) =>
          of(err).pipe(
            tap(({ error }) => {
              this.message = error.message;
              this.type = 'error';
              this.showSnackbar();
            })
          )
        )
      )
      .subscribe();
  }

  public showSnackbar(): void {
    this.isSnackVisible = !this.isSnackVisible;
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
