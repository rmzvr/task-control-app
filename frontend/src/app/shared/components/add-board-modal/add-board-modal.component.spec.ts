import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { BoardsState } from '@core/models/boards.models';
import { ModalsState } from '@core/models/modals.models';
import { addBoard } from '@core/states/boards';
import { toggleAddBoardModal, updateModalTitle } from '@core/states/modals';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { AddBoardModalComponent } from './add-board-modal.component';

describe('AddBoardModalComponent', () => {
  let component: AddBoardModalComponent;
  let fixture: ComponentFixture<AddBoardModalComponent>;
  let store: MockStore<ModalsState | BoardsState>;
  let formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddBoardModalComponent],
      providers: [
        provideMockStore({}),
        { provide: FormBuilder, useValue: formBuilder },
      ],
      imports: [ReactiveFormsModule],

      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(AddBoardModalComponent);
    component = fixture.componentInstance;
    component.boardForm = formBuilder.group({
      name: new FormControl(''),
      description: new FormControl(''),
    });
    component.userID = '1';
    fixture.detectChanges();
    spyOn(store, 'dispatch').and.callFake(() => {});
  });

  it('should set color to #ffffff', () => {
    component.setColor('#ffffff');
    expect(component.color).toBe('#ffffff');
  });

  it('closeModal should dispatch toggleAddBoardModal action', () => {
    component.closeModal();
    expect(store.dispatch).toHaveBeenCalledWith(toggleAddBoardModal());
  });

  it('closeModal should dispatch updateModalTitle action', () => {
    component.closeModal();
    expect(store.dispatch).toHaveBeenCalledWith(
      updateModalTitle({ title: '' })
    );
  });

  it('closeModal should dispatch 2 events', () => {
    component.closeModal();
    expect(store.dispatch).toHaveBeenCalledTimes(2);
  });

  it('addBoard should dispatch addBoard action', () => {
    component.addBoard();
    expect(store.dispatch).toHaveBeenCalledWith(
      addBoard({
        board: {
          name: '',
          description: '',
          background: '#0079bf',
          userID: '1',
        },
      })
    );
  });

  it('updateModalTitle should dispatch updateModalTitle action', () => {
    component.updateModalTitle();
    expect(store.dispatch).toHaveBeenCalledWith(
      updateModalTitle({ title: 'Create board' })
    );
  });
});
