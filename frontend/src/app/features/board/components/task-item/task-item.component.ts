import { Component, EventEmitter, Input, Output } from '@angular/core';
import { selectTaskComments } from '@core/states/comments';
import { toggleTaskMenu, toggleTaskModal } from '@core/states/modals';
import { setCurrentTask, Task } from '@core/states/tasks';
import { Store } from '@ngrx/store';
import { concatMap, filter, from, Observable, toArray } from 'rxjs';

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

  public setCurrentTask(): void {
    this.store.dispatch(setCurrentTask({ task: this.task }));
  }

  public toggleTaskMenu(): void {
    this.store.dispatch(toggleTaskMenu());
  }

  public toggleTaskModal(): void {
    this.store.dispatch(toggleTaskModal());
  }
}
