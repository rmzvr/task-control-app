// import { DebugElement } from '@angular/core';
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { By } from '@angular/platform-browser';
// import { TextareaStubComponent } from 'src/app/utils/stub';
// import { DraggableDirective } from './draggable.directive';

// describe('DraggableDirective', () => {
//   let fixture: ComponentFixture<TextareaStubComponent>;
//   let component: TextareaStubComponent;
//   let de: DebugElement;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [TextareaStubComponent, DraggableDirective],
//     }).compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(TextareaStubComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//     de = fixture.debugElement;
//   });

//   it('should start dragging', () => {
//     const textareaEl = fixture.debugElement.query(By.css('textarea'));
//     textareaEl.triggerEventHandler('pointerenter', null);
//     fixture.detectChanges();

//     expect(textareaEl.nativeElement.classList.contains('entered')).toBeTrue();
//   });

//   it('should finish dragging event', () => {
//     const textareaEl = fixture.debugElement.query(By.css('textarea'));
//     textareaEl.triggerEventHandler('document:pointerup', null);
//     fixture.detectChanges();

//     expect(textareaEl.nativeElement.classList.contains('dragging')).toBeFalse();
//   });
// });
