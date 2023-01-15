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
import { addBoard, updateBoard } from '@core/states/boards';
import {
  toggleAddBoardModal,
  toggleUpdateBoardModal,
  updateModalTitle,
} from '@core/states/modals';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { EditBoardModalComponent } from './edit-board-modal.component';

describe('EditBoardModalComponent', () => {
  let component: EditBoardModalComponent;
  let fixture: ComponentFixture<EditBoardModalComponent>;
  let store: MockStore<ModalsState | BoardsState>;
  let formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditBoardModalComponent],
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
    fixture = TestBed.createComponent(EditBoardModalComponent);
    component = fixture.componentInstance;
    component.boardForm = formBuilder.group({
      name: new FormControl(''),
      description: new FormControl(''),
    });
    component.editableBoard = {
      name: '',
      description: '',
      background: '#0079bf',
      userID: '1',
    };
    component.color = '#0079bf';
    fixture.detectChanges();
    spyOn(store, 'dispatch').and.callFake(() => {});
  });

  it('should set color to #ffffff', () => {
    component.setColor('#ffffff');
    expect(component.color).toBe('#ffffff');
  });

  it('closeModal should dispatch toggleUpdateBoardModal action', () => {
    component.closeModal();
    expect(store.dispatch).toHaveBeenCalledWith(toggleUpdateBoardModal());
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

  it('updateBoard should dispatch updateBoard action', () => {
    component.updateBoard();
    expect(store.dispatch).toHaveBeenCalledWith(
      updateBoard({
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
      updateModalTitle({ title: 'Edit board' })
    );
  });
});
