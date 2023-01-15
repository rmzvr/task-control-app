import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommentsState } from '@core/models/comments.models';
import { ModalsState } from '@core/models/modals.models';
import { loadComments } from '@core/states/comments';
import { toggleTaskModal } from '@core/states/modals';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { TaskModalComponent } from './task-modal.component';

describe('TaskModalComponent', () => {
  let component: TaskModalComponent;
  let fixture: ComponentFixture<TaskModalComponent>;
  let store: MockStore<ModalsState | CommentsState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskModalComponent],
      providers: [provideMockStore({})],
    }).compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(TaskModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(store, 'dispatch').and.callFake(() => {});
  });

  it('toggleModal should dispatch toggleTaskModal action', () => {
    component.toggleModal();
    expect(store.dispatch).toHaveBeenCalledWith(toggleTaskModal());
  });

  it('loadComments should dispatch loadComments action', () => {
    component.loadComments('1');
    expect(store.dispatch).toHaveBeenCalledWith(loadComments({ boardID: '1' }));
  });
});
