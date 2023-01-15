import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LoginService],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(LoginService);
  });

  beforeEach(() => {
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(LoginService);
  });

  beforeEach(() => {
    let store: any = {};
    const mockLocalStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      },
    };
    spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem').and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear').and.callFake(mockLocalStorage.clear);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('registerUser', () => {
    const user = {
      username: 'user',
      password: 'pass',
      _id: '1',
      created_date: 's',
    };
    const url = 'https://serene-plains-22341.herokuapp.com/api/auth/register';

    it('should register user', () => {
      service.registerUser(user).subscribe({
        next: (res) => expect(res).toEqual(user),
        error: fail,
      });

      const req = httpTestingController.expectOne(url);
      expect(req.request.method).toEqual('POST');

      req.flush(user);
    });
  });

  describe('loginUser', () => {
    const user = {
      username: 'user',
      password: 'pass',
      _id: '1',
      created_date: 's',
    };
    const url = 'https://serene-plains-22341.herokuapp.com/api/auth/login';

    it('should login user', () => {
      service.loginUser(user).subscribe({
        next: (res) => expect(res).toEqual(user),
        error: fail,
      });

      const req = httpTestingController.expectOne(url);
      expect(req.request.method).toEqual('POST');

      req.flush(user);
    });
  });

  describe('logout', () => {
    it('should clean local storage after logout', () => {
      localStorage.clear();
      localStorage.setItem('isAuthorized', 'true');
      localStorage.setItem('token', '1');
      service.logout();
      expect(localStorage.length).toBe(0);
    });
  });

  describe('getToken', () => {
    it('should return token from localStorage', () => {
      localStorage.clear();
      localStorage.setItem('token', '1');
      expect(service.getToken()).toBe('1');
    });
  });

  describe('getIsAuthorized', () => {
    it('should return isAuthorized value from localStorage', () => {
      localStorage.clear();
      localStorage.setItem('isAuthorized', 'true');
      expect(service.getIsAuthorized()).toBe('true');
    });
  });
});
