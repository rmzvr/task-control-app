import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalsState } from '@core/models/modals.models';
import { TasksState } from '@core/models/tasks.models';
import { toggleTaskMenu, toggleTaskModal } from '@core/states/modals';
import { setCurrentTask } from '@core/states/tasks';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { TaskItemComponent } from './task-item.component';

describe('TaskItemComponent', () => {
  let component: TaskItemComponent;
  let fixture: ComponentFixture<TaskItemComponent>;
  let store: MockStore<ModalsState | TasksState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskItemComponent],
      providers: [provideMockStore({})],
    }).compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(TaskItemComponent);
    component = fixture.componentInstance;
    component.task = {
      _id: 'string',
      name: 'string',
      listID: 'string',
      boardID: 'string',
      description: 'string',
      created_date: 'string',
    };
    fixture.detectChanges();
    spyOn(store, 'dispatch').and.callFake(() => {});
  });

  it('toggleTaskMenu should dispatch toggleTaskMenu action', () => {
    component.toggleTaskMenu();
    expect(store.dispatch).toHaveBeenCalledWith(toggleTaskMenu());
  });

  it('toggleTaskModal should dispatch toggleTaskModal action', () => {
    component.toggleTaskModal();
    expect(store.dispatch).toHaveBeenCalledWith(toggleTaskModal());
  });

  it('setCurrentTask should dispatch setCurrentTask action', () => {
    component.setCurrentTask();
    expect(store.dispatch).toHaveBeenCalledWith(
      setCurrentTask({ task: component.task })
    );
  });
});
