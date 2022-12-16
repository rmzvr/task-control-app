import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { selectBoard } from '@core/states/boards';
import { loadComments } from '@core/states/comments';
import {
  List,
  loadLists,
  selectListItems,
  selectStatus,
} from '@core/states/lists';
import { selectModalTaskOpen, toggleTaskModal } from '@core/states/modals';
import { loadTasks } from '@core/states/tasks';
import { loadUser } from '@core/states/user';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  public boardID: string;
  public boardName: string = '';
  public board$: Observable<any>;

  public isTaskModalOpen$: Observable<boolean>;

  public lists$: Observable<List[]>;

  constructor(private store: Store, private route: ActivatedRoute) {
    this.boardID = this.route.snapshot.paramMap.get('id') as string;

    this.board$ = this.store.select(selectBoard({ id: this.boardID }));

    this.lists$ = this.store.select(selectListItems);

    this.isTaskModalOpen$ = this.store.select(selectModalTaskOpen);
  }

  ngOnInit(): void {
    this.store.dispatch(loadUser());

    this.store.dispatch(loadLists({ boardID: this.boardID }));
    this.store.dispatch(loadTasks({ boardID: this.boardID }));
    this.store.dispatch(loadComments({ boardID: this.boardID }));
  }

  public closeMenuOnOverlay(event: Event): void {
    const el = event.target as HTMLElement;

    if (!el.getAttribute('data-overlay')) return;

    this.store.dispatch(toggleTaskModal());
  }
}
