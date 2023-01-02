import { Component, EventEmitter, Input, Output } from '@angular/core';
import { selectTaskComments } from '@core/states/comments';
import { toggleTaskMenu, toggleTaskModal } from '@core/states/modals';
import { setCurrentTask, Task } from '@core/states/tasks';
import { Store } from '@ngrx/store';
import {
  concatMap,
  distinct,
  filter,
  from,
  mergeMap,
  Observable,
  tap,
  toArray,
} from 'rxjs';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Output() clickEmitter: EventEmitter<Event> = new EventEmitter();

  public comments$: Observable<any>;

  constructor(private store: Store) {
    this.comments$ = this.store.select(selectTaskComments).pipe(
      concatMap((e) =>
        from(e).pipe(
          filter((b) => b.taskID === this.task._id),
          toArray()
        )
      )
    );
  }

  public openTask(): void {
    this.store.dispatch(setCurrentTask({ task: this.task }));

    this.store.dispatch(toggleTaskModal());
  }

  public openTaskMenu(event: Event): void {
    event.stopPropagation();

    this.store.dispatch(setCurrentTask({ task: this.task }));
    this.store.dispatch(toggleTaskMenu());
  }

  public setCurrentTask(): void {
    this.store.dispatch(setCurrentTask({ task: this.task }));
  }
}
