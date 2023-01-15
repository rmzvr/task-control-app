import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalsState } from '@core/models/modals.models';
import { updateTaskMenuPosition } from '@core/states/modals';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TextareaStubComponent } from 'src/app/utils/stub';
import { HoverDirective } from './hover.directive';

describe('HoverDirective', () => {
  let fixture: ComponentFixture<TextareaStubComponent>;
  let component: TextareaStubComponent;
  let de: DebugElement;
  let store: MockStore<ModalsState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextareaStubComponent, HoverDirective],
      providers: [provideMockStore({})],
    }).compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(TextareaStubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement;
    spyOn(store, 'dispatch').and.callFake(() => {});
  });

  it('mousedown event should dispatch updateTaskMenuPosition action', () => {
    const textarea = de.nativeElement.querySelector(
      'textarea'
    ) as HTMLTextAreaElement;

    const { x, y, width, height } = textarea.getBoundingClientRect();

    textarea.dispatchEvent(new MouseEvent('mousedown'));

    expect(store.dispatch).toHaveBeenCalledWith(
      updateTaskMenuPosition({ x, y, width, height })
    );
  });
});
