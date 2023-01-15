import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BoardsState } from '@core/models/boards.models';
import { DashboardComponent } from './dashboard.component';
import { loadBoards } from '@core/states/boards';
import { loadUser } from '@core/states/user';
import { toggleAddBoardModal } from '@core/states/modals';

describe('AllShowsComponent', () => {
  let fixture: ComponentFixture<DashboardComponent>;
  let component: DashboardComponent;
  let store: MockStore<BoardsState>;
  const initialState = {
    boards: [
      {
        _id: '1',
        name: 'Board',
        userID: '1',
        description: 'Description',
        background: '#ffffff',
        created_date: '1',
      },
      {
        _id: '1',
        name: 'Board',
        userID: '1',
        description: 'Description',
        background: '#ffffff',
        created_date: '1',
      },
    ],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      providers: [provideMockStore({ initialState })],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

    spyOn(store, 'dispatch').and.callFake(() => {});
  });

  it('loadBoards should dispatch loadBoards action', () => {
    component.loadBoards('1');
    expect(store.dispatch).toHaveBeenCalledWith(loadBoards({ id: '1' }));
  });

  it('loadUser should dispatch loadUser action', () => {
    component.loadUser();
    expect(store.dispatch).toHaveBeenCalledWith(loadUser());
  });

  it('toggleAddBoardModal should dispatch toggleAddBoardModal action', () => {
    component.toggleAddBoardModal();
    expect(store.dispatch).toHaveBeenCalledWith(toggleAddBoardModal());
  });
});
