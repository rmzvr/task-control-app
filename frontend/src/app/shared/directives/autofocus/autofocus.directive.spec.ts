import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TextareaStubComponent } from 'src/app/utils/stub';
import { AutofocusDirective } from './autofocus.directive';

describe('AutofocusDirective', () => {
  let fixture: ComponentFixture<TextareaStubComponent>;
  let component: TextareaStubComponent;
  let de: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextareaStubComponent, AutofocusDirective],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextareaStubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement;
  });

  it('should focus', () => {
    const focusedEl = document.activeElement;
    const textarea = de.nativeElement.querySelector('textarea');

    expect(textarea).toBe(focusedEl);
  });
});
