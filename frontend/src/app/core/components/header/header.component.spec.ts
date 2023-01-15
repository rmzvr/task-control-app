import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { LoginService } from '@features/login/services/login.service';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router: Router;
  let loginServiceSpy: LoginService;

  beforeEach(async () => {
    loginServiceSpy = jasmine.createSpyObj<LoginService>(['logout']);

    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [{ provide: LoginService, useValue: loginServiceSpy }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
    spyOn(router, 'navigate');
  });

  it('should navigate to login page after logout', () => {
    component.logout();
    expect(router.navigate).toHaveBeenCalledWith(['login']);
  });

  it('should call logout method', () => {
    component.logout();
    expect(loginServiceSpy.logout).toHaveBeenCalledTimes(1);
  });
});
