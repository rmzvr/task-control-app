import {
  HttpClient,
  HttpHeaders,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { LoginService } from '../services/login.service';

import { AuthInterceptor } from './auth.interceptor';

describe('AuthInterceptor', () => {
  let loginServiceSpy: any;

  beforeEach(() => {
    loginServiceSpy = jasmine.createSpyObj<LoginService>(['getToken']);
    loginServiceSpy.getToken.and.returnValue('1')

    TestBed.configureTestingModule({
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true,
        },
        { provide: LoginService, useValue: loginServiceSpy },
      ],
      imports: [HttpClientTestingModule],
    });
  });

  it('should add Authorization header', inject(
    [HttpClient, HttpTestingController],
    (http: HttpClient, httpTestingController: HttpTestingController) => {
      let response;
      const headers = new HttpHeaders();

      http.get('/', { headers }).subscribe((res) => (response = res));

      const req = httpTestingController.expectOne('/');
      expect(req.request.headers.get('Authorization')).toBeTruthy();

      req.flush(true);
      httpTestingController.verify();
    }
  ));

  it('should add Authorization as "Bearer 1"', inject(
    [HttpClient, HttpTestingController],
    (http: HttpClient, httpTestingController: HttpTestingController) => {
      let response;
      const headers = new HttpHeaders();

      http.get('/', { headers }).subscribe((res) => (response = res));

      const req = httpTestingController.expectOne('/');
      expect(req.request.headers.get('Authorization')).toBe('Bearer 1');

      req.flush(true);
      httpTestingController.verify();
    }
  ));
});
