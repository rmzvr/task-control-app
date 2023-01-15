import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TextareaStubComponent } from 'src/app/utils/stub';
import { ResizeDirective } from './resize.directive';

describe('ResizeDirective', () => {
  let fixture: ComponentFixture<TextareaStubComponent>;
  let component: TextareaStubComponent;
  let de: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextareaStubComponent, ResizeDirective],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextareaStubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement;
  });

  it('should change element height on input event', () => {
    const textarea = de.nativeElement.querySelector(
      'textarea'
    ) as HTMLTextAreaElement;

    textarea.value =
      'Lorem190Lorem190Lorem190Lorem190LoremLorem190Lorem190Lorem190Lorem190LoremLorem190Lorem190Lorem190Lorem190LoremLorem190Lorem190Lorem190Lorem190LoremLorem190Lorem190Lorem190Lorem190LoremLorem190Lorem190Lorem190Lorem190Lorem';
    
    expect(textarea.offsetHeight).not.toBe(textarea.scrollHeight);
    
    textarea.dispatchEvent(new Event('input'));

    expect(textarea.offsetHeight).toBe(textarea.scrollHeight);
  });
});
