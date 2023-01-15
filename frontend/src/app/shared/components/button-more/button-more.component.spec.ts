import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonMoreComponent } from './button-more.component';

describe('ButtonMoreComponent', () => {
  let component: ButtonMoreComponent;
  let fixture: ComponentFixture<ButtonMoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonMoreComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should change button theme to light', () => {
    component.isButtonLight = true;
    expect(component.setButtonTheme()).toBe(
      'button-more button-more--theme--light'
    );
  });

  it('should change button theme to dark', () => {
    component.isButtonLight = false;
    expect(component.setButtonTheme()).toBe(
      'button-more button-more--theme--dark'
    );
  });
});
