import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { BoardComponent } from './board.component';
import { ListsState } from '@core/models/lists.models';
import { TasksState } from '@core/models/tasks.models';
import { CommentsState } from '@core/models/comments.models';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ToolbarStubComponent } from 'src/app/utils/stub';
import { loadUser } from '@core/states/user';
import { loadLists } from '@core/states/lists';
import { loadTasks } from '@core/states/tasks';
import { loadComments } from '@core/states/comments';
import { toggleTaskModal } from '@core/states/modals';

describe('BoardComponent', () => {
  let fixture: ComponentFixture<BoardComponent>;
  let component: BoardComponent;
  let store: MockStore<ListsState | TasksState | CommentsState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoardComponent, ToolbarStubComponent],
      imports: [RouterTestingModule],
      providers: [provideMockStore({})],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    component.toolbarComponent = TestBed.createComponent(ToolbarStubComponent)
      .componentInstance as any;

    fixture.detectChanges();

    spyOn(store, 'dispatch').and.callFake(() => {});
  });

  it('loadUser should dispatch loadUser action', () => {
    component.loadUser();
    expect(store.dispatch).toHaveBeenCalledWith(loadUser());
  });

  it('loadLists should dispatch loadLists action', () => {
    component.loadLists('1');
    expect(store.dispatch).toHaveBeenCalledWith(loadLists({ boardID: '1' }));
  });

  it('loadTasks should dispatch loadTasks action', () => {
    component.loadTasks('1');
    expect(store.dispatch).toHaveBeenCalledWith(loadTasks({ boardID: '1' }));
  });

  it('loadComments should dispatch loadComments action', () => {
    component.loadComments('1');
    expect(store.dispatch).toHaveBeenCalledWith(loadComments({ boardID: '1' }));
  });

  it('closeMenu should dispatch toggleAddBoardModal action', () => {
    const el = document.createElement('div');
    el.classList.add('task-overlay');

    component.closeMenu(el);

    expect(store.dispatch).toHaveBeenCalledWith(toggleTaskModal());
  });
});
