import { Component, EventEmitter, Input, Output } from '@angular/core';
import { selectTaskComments } from '@core/states/comments';
import { toggleTaskMenu, toggleTaskModal } from '@core/states/modals';
import { setCurrentTask } from '@core/states/tasks';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent {
  @Input() task: any;

  public comments$: Observable<any>;

  @Output() clickEmitter: EventEmitter<Event> = new EventEmitter();

  constructor(private store: Store) {
    this.comments$ = this.store.select(selectTaskComments);
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
