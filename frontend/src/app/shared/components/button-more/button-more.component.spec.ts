import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonMoreComponent } from './button-more.component';

describe('ButtonMoreComponent', () => {
  let component: ButtonMoreComponent;
  let fixture: ComponentFixture<ButtonMoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonMoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
