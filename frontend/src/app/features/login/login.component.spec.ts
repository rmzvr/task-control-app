import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { LoginComponent } from './login.component';
import { LoginService } from './services/login.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginServiceSpy: any;
  let formBuilder: FormBuilder = new FormBuilder();
  let router: Router;

  beforeEach(async () => {
    loginServiceSpy = jasmine.createSpyObj<LoginService>([
      'loginUser',
      'registerUser',
    ]);
    loginServiceSpy.registerUser.and.returnValue(of([]));
    loginServiceSpy.loginUser.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        { provide: LoginService, useValue: loginServiceSpy },
        { provide: FormBuilder, useValue: formBuilder },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [ReactiveFormsModule, FormsModule, RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    component.loginForm = formBuilder.group({
      username: new FormControl(''),
      password: new FormControl(''),
    });
    router = TestBed.inject(Router);
    fixture.detectChanges();
    spyOn(router, 'navigate');
  });

  it('should call register method', () => {
    component.register(new Event('click'));

    component.loginForm.get('username')?.setValue('');
    component.loginForm.get('password')?.setValue('');

    expect(loginServiceSpy.registerUser).toHaveBeenCalledOnceWith(
      component.loginForm.value
    );
  });

  it('should call login method', () => {
    component.login(new Event('click'));

    component.loginForm.get('username')?.setValue('');
    component.loginForm.get('password')?.setValue('');

    expect(loginServiceSpy.loginUser).toHaveBeenCalledOnceWith(
      component.loginForm.value
    );
  });

  it('should navigate to dashboard page after login', () => {
    component.login(new Event('click'));

    component.loginForm.get('username')?.setValue('');
    component.loginForm.get('password')?.setValue('');

    expect(router.navigate).toHaveBeenCalledWith(['dashboard']);
  });

  it('should show snackbar', () => {
    component.showSnackbar();

    expect(component.isSnackVisible).toBeTrue();
  });

  it('login form should be hidden', () => {
    component.toggleForms();

    expect(component.isLoginForm).toBeFalse();
  });
});
