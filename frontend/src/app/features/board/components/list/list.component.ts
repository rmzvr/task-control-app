import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { List, updateList } from '@core/states/lists';
import {
  EditTaskMenuPosition,
  selectEditTaskMenuPosition,
} from '@core/states/modals';

import {
  selectBoardTasks,
  selectCurrentTask,
  addTask,
  updateTask,
  setCurrentTask,
} from '@core/states/tasks';

import { Task } from '@core/states/tasks/tasks.models';
import { selectToolbarValues, ToolbarState } from '@core/states/toolbar';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [
    trigger('rotatedState', [
      state('default', style({ transform: 'rotate(0)' })),
      state('rotated', style({ transform: 'rotate(-180deg)' })),
      transition('default => rotated', animate('200ms')),
      transition('rotated => default', animate('200ms')),
    ]),
  ],
})
export class ListComponent implements OnInit {
  public searchType: string = 'task';

  @Input() list!: List;
  @Input() boardID!: string;

  public isNewTaskFormOpen: boolean = false;
  public isContextMenuOpen: boolean = false;
  public isArchivedTaskVisible: boolean = false;

  public toolbarValues$: Observable<ToolbarState>;

  public currentTask$: Observable<Task | null>;
  public currentTask!: Task | null;

  public tasks$: Observable<any>;

  public state: string = 'default';

  public editTaskMenuPosition$: Observable<EditTaskMenuPosition>;

  constructor(private store: Store) {
    this.toolbarValues$ = this.store.select(selectToolbarValues);

    this.currentTask$ = this.store.select(selectCurrentTask);

    this.tasks$ = this.store.select(selectBoardTasks);

    this.editTaskMenuPosition$ = this.store.select(selectEditTaskMenuPosition);
  }

  ngOnInit(): void {
    this.currentTask$.subscribe((task) => {
      this.currentTask = task;
    });
  }

  public rotate() {
    this.state = this.state === 'default' ? 'rotated' : 'default';
  }

  public toggleArchivedTasksVisibility(): void {
    this.isArchivedTaskVisible = !this.isArchivedTaskVisible;
  }

  public toggleNewTaskForm(): void {
    this.isNewTaskFormOpen = !this.isNewTaskFormOpen;
  }

  public toggleContextMenu(): void {
    this.isContextMenuOpen = !this.isContextMenuOpen;
  }

  public updateList(list: List, color: string) {
    this.store.dispatch(
      updateList({
        list: {
          ...list,
          background: color,
        },
      })
    );
  }

  public addTask(event: Event, value: string) {
    event.preventDefault();

    this.store.dispatch(
      addTask({
        task: { name: value, listID: this.list._id, boardID: this.boardID },
      })
    );

    this.toggleNewTaskForm();
  }

  public moveTask(): void {
    if (this.currentTask?.listID === this.list._id) {
      return;
    }

    this.store.dispatch(
      updateTask({
        task: {
          ...this.currentTask,
          listID: this.list._id,
        },
      })
    );
  }

  public setCurrentTask(task: Task): void {
    this.store.dispatch(setCurrentTask({ task: { ...task } }));
  }
}
