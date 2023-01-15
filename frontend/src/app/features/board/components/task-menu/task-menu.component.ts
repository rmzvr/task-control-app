import { Component, OnInit } from '@angular/core';
import { selectArchiveList } from '@core/states/lists';
import {
  EditTaskMenuPosition,
  selectEditTaskMenuPosition,
  selectIsTaskMenuOpen,
  toggleTaskMenu,
  toggleTaskModal,
} from '@core/states/modals';
import { deleteTask, selectCurrentTask, updateTask } from '@core/states/tasks';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-task-menu',
  templateUrl: './task-menu.component.html',
  styleUrls: ['./task-menu.component.scss'],
})
export class TaskMenuComponent implements OnInit {
  public isTaskMenuOpen$: Observable<boolean>;

  public currentTask$: Observable<any>;
  public currentTask: any;

  public editTaskMenuPosition$: Observable<EditTaskMenuPosition>;

  public archiveList$: Observable<any>;
  public archiveList: any;

  constructor(private store: Store) {
    this.archiveList$ = this.store.select(selectArchiveList);

    this.isTaskMenuOpen$ = this.store.select(selectIsTaskMenuOpen);
    this.currentTask$ = this.store.select(selectCurrentTask);
    this.editTaskMenuPosition$ = this.store.select(selectEditTaskMenuPosition);
  }

  ngOnInit(): void {
    this.archiveList$.subscribe((list) => {
      this.archiveList = list;
    });

    this.currentTask$.subscribe((task) => {
      this.currentTask = task;
    });
  }

  public closeMenu(target: EventTarget | null): void {
    const el = target as HTMLDivElement;

    if (!el.classList.contains('task-menu-overlay')) return;

    this.toggleTaskMenu();
  }

  public toggleTaskMenu(): void {
    this.store.dispatch(toggleTaskMenu());
  }

  public toggleTaskModal(): void {
    this.store.dispatch(toggleTaskModal());
  }

  public updateTask(event: Event, value: string): void {
    event.preventDefault();

    this.store.dispatch(
      updateTask({
        task: {
          ...this.currentTask,
          name: value,
        },
      })
    );
  }

  public archiveTask(): void {
    this.store.dispatch(
      updateTask({
        task: {
          ...this.currentTask,
          listID: this.archiveList._id,
        },
      })
    );
  }

  public deleteTask(): void {
    this.store.dispatch(deleteTask({ task: this.currentTask }));
  }
}
