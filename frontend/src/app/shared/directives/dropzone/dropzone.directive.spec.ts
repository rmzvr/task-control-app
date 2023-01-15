import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToolbarStubComponent } from 'src/app/utils/stub';
import { DropzoneDirective } from './dropzone.directive';

describe('DropzoneDirective', () => {
  let fixture: ComponentFixture<ToolbarStubComponent>;
  let component: ToolbarStubComponent;
  let de: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToolbarStubComponent, DropzoneDirective],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarStubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement;
  });

  it('should add "dropzone-default" class to element on mousedown event', () => {
    const dropzoneEl = de.nativeElement.querySelector('div') as HTMLDivElement;

    dropzoneEl.dispatchEvent(new MouseEvent('mousedown'));
    fixture.detectChanges();

    expect(dropzoneEl.classList.contains('dropzone-default')).toBeTrue();
  });

  it('should remove "dropzone-default" class to element on mouseup event', () => {
    const dropzoneEl = de.nativeElement.querySelector('div') as HTMLDivElement;

    dropzoneEl.dispatchEvent(new MouseEvent('mousedown'));
    fixture.detectChanges();

    expect(dropzoneEl.classList.contains('dropzone-default')).toBeTrue();

    dropzoneEl.dispatchEvent(new MouseEvent('mouseup'));
    fixture.detectChanges();

    expect(dropzoneEl.classList.contains('dropzone-default')).toBeFalse();
  });
});
