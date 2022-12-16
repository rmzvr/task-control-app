import { Component, Input, OnInit } from '@angular/core';
import { loadComments, selectTaskComments } from '@core/states/comments';
import { List, selectList } from '@core/states/lists';
import { toggleTaskModal } from '@core/states/modals';
import { selectCurrentTask } from '@core/states/tasks';
import { selectUser } from '@core/states/user';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss'],
})
export class TaskModalComponent implements OnInit {
  public user$: Observable<any>;
  public task$: Observable<any>;
  public comments$: Observable<any>;
  public list$!: Observable<List>;

  constructor(private store: Store) {
    this.user$ = this.store.select(selectUser);
    this.task$ = this.store.select(selectCurrentTask);
    this.comments$ = this.store.select(selectTaskComments);
  }

  ngOnInit(): void {
    this.task$.subscribe((task) => {
      this.store.dispatch(loadComments({ boardID: task.boardID }));
      this.list$ = this.store.select(selectList({ id: task.listID }));
    });
  }

  public toggleModal(): void {
    this.store.dispatch(toggleTaskModal());
  }
}
