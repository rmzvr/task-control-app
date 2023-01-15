import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { updateList } from '@core/states/lists';
import { addTask, setCurrentTask, updateTask } from '@core/states/tasks';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ListComponent } from './list.component';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let store: MockStore<any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListComponent],
      imports: [RouterTestingModule],
      providers: [provideMockStore({})],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    component.list = {
      _id: 'string',
      name: 'string',
      boardID: 'string',
      background: '#ffffff',
      isArchive: false,
    };
    component.boardID = 'string';
    fixture.detectChanges();
    spyOn(store, 'dispatch').and.callFake(() => {});
  });

  it('archived tasks form should be hidden', () => {
    expect(component.isArchivedTaskVisible).toBeFalse();
  });

  it('should make visible archived tasks', () => {
    component.toggleArchivedTasksVisibility();
    expect(component.isArchivedTaskVisible).toBeTrue();
  });

  it('should hide archived tasks', () => {
    component.toggleArchivedTasksVisibility();
    component.toggleArchivedTasksVisibility();
    expect(component.isArchivedTaskVisible).toBeFalse();
  });

  it('newTask form should be hidden', () => {
    expect(component.isNewTaskFormOpen).toBeFalse();
  });

  it('should open newTask form', () => {
    component.toggleNewTaskForm();
    expect(component.isNewTaskFormOpen).toBeTrue();
  });

  it('should close newTask form', () => {
    component.toggleNewTaskForm();
    component.toggleNewTaskForm();
    expect(component.isNewTaskFormOpen).toBeFalse();
  });

  it('context menu should be hidden', () => {
    expect(component.isContextMenuOpen).toBeFalse();
  });

  it('should open context menu', () => {
    component.toggleContextMenu();
    expect(component.isContextMenuOpen).toBeTrue();
  });

  it('should close context menu', () => {
    component.toggleContextMenu();
    component.toggleContextMenu();
    expect(component.isContextMenuOpen).toBeFalse();
  });

  it('should change button animation state to rotated', () => {
    component.rotate();
    expect(component.state).toBe('rotated');
  });

  it('updateComment should dispatch updateComment action', () => {
    component.updateList(component.list, '#ffffff');
    expect(store.dispatch).toHaveBeenCalledWith(
      updateList({ list: component.list })
    );
  });

  it('addTask should dispatch addTask action', () => {
    const task = {
      name: 'task',
      listID: 'string',
      boardID: 'string',
    };

    component.addTask('task');
    expect(store.dispatch).toHaveBeenCalledWith(addTask({ task }));
  });

  it('moveTask should dispatch updateTask action', () => {
    const task = {
      listID: 'string',
    };

    component.moveTask();
    expect(store.dispatch).toHaveBeenCalledWith(updateTask({ task }));
  });

  it('setCurrentTask should dispatch setCurrentTask action', () => {
    const task = {
      _id: 'string',
      name: 'string',
      listID: 'string',
      boardID: 'string',
      description: 'string',
      created_date: 'string',
    };

    component.setCurrentTask(task);
    expect(store.dispatch).toHaveBeenCalledWith(setCurrentTask({ task }));
  });
});
