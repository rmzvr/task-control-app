import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalsState } from '@core/models/modals.models';
import { TasksState } from '@core/models/tasks.models';
import { toggleTaskMenu, toggleTaskModal } from '@core/states/modals';
import { deleteTask, updateTask } from '@core/states/tasks';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { TaskMenuComponent } from './task-menu.component';

describe('TaskMenuComponent', () => {
  let component: TaskMenuComponent;
  let fixture: ComponentFixture<TaskMenuComponent>;
  let store: MockStore<ModalsState | TasksState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskMenuComponent],
      providers: [provideMockStore({})],
    }).compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(TaskMenuComponent);
    component = fixture.componentInstance;

    component.currentTask = {
      _id: 'string',
      name: 'string',
      listID: 'string',
      boardID: 'string',
      description: 'string',
      created_date: 'string',
    };

    component.archiveList = {
      _id: 'string',
      name: 'string',
      boardID: 'string',
      background: 'string',
      isArchive: 'boolean',
    };

    fixture.detectChanges();
    spyOn(store, 'dispatch').and.callFake(() => {});
  });

  it('closeMenu should dispatch toggleTaskMenu action', () => {
    const el = document.createElement('div');
    el.classList.add('task-menu-overlay');

    component.closeMenu(el);

    expect(store.dispatch).toHaveBeenCalledWith(toggleTaskMenu());
  });

  it('toggleTaskMenu should dispatch toggleTaskMenu action', () => {
    component.toggleTaskMenu();
    expect(store.dispatch).toHaveBeenCalledWith(toggleTaskMenu());
  });

  it('toggleTaskModal should dispatch toggleTaskModal action', () => {
    component.toggleTaskModal();
    expect(store.dispatch).toHaveBeenCalledWith(toggleTaskModal());
  });

  it('updateTask should dispatch updateTask action', () => {
    component.updateTask(new Event('click'), 'string');
    expect(store.dispatch).toHaveBeenCalledWith(
      updateTask({ task: component.currentTask })
    );
  });

  it('archiveTask should dispatch updateTask action', () => {
    component.archiveTask();
    expect(store.dispatch).toHaveBeenCalledWith(
      updateTask({ task: component.currentTask })
    );
  });

  it('deleteTask should dispatch deleteTask action', () => {
    component.deleteTask();
    expect(store.dispatch).toHaveBeenCalledWith(
      deleteTask({ task: component.currentTask })
    );
  });
});
