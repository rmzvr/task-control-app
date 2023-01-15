import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BoardsState } from '@core/models/boards.models';
import { ModalsState } from '@core/models/modals.models';
import { deleteBoard, setEditableBoard } from '@core/states/boards';
import { toggleUpdateBoardModal } from '@core/states/modals';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { BoardTileComponent } from './board-tile.component';

describe('BoardTileComponent', () => {
  let component: BoardTileComponent;
  let fixture: ComponentFixture<BoardTileComponent>;
  let store: MockStore<BoardsState | ModalsState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoardTileComponent],
      imports: [RouterTestingModule],
      providers: [provideMockStore({})],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(BoardTileComponent);
    component = fixture.componentInstance;
    component.board = {
      _id: 'string',
      name: 'string',
      userID: 'string',
      description: 'string',
      background: 'string',
      created_date: new Date().toDateString(),
    };
    fixture.detectChanges();
    spyOn(store, 'dispatch').and.callFake(() => {});
  });

  it('board tile menu should be hidden', () => {
    expect(component.isMenuOpen).toBeFalse();
  });

  it('should open board tile menu', () => {
    component.toggleMenu(new Event('click'));
    expect(component.isMenuOpen).toBeTrue();
  });

  it('should close board tile menu', () => {
    component.toggleMenu(new Event('click'));
    component.toggleMenu(new Event('click'));
    expect(component.isMenuOpen).toBeFalse();
  });

  it('toggleUpdateBoardModal should dispatch toggleUpdateBoardModal action', () => {
    component.toggleUpdateBoardModal();
    expect(store.dispatch).toHaveBeenCalledWith(toggleUpdateBoardModal());
  });

  it('setEditableBoard should dispatch setEditableBoard action', () => {
    component.setEditableBoard();
    expect(store.dispatch).toHaveBeenCalledWith(
      setEditableBoard({ board: component.board })
    );
  });

  it('deleteBoard should dispatch deleteBoard action', () => {
    component.deleteBoard();
    expect(store.dispatch).toHaveBeenCalledWith(
      deleteBoard({ board: component.board })
    );
  });
});
