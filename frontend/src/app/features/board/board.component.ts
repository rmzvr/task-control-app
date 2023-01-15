import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { loadComments } from '@core/states/comments';
import { List, loadLists, selectListItems } from '@core/states/lists';
import { selectModalTaskOpen, toggleTaskModal } from '@core/states/modals';
import { loadTasks } from '@core/states/tasks';
import { loadUser } from '@core/states/user';
import { Store } from '@ngrx/store';
import { ToolbarComponent } from '@shared/components/toolbar/toolbar.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  public boardID: string;
  public boardName: string;

  public isTaskModalOpen$: Observable<boolean>;

  public lists$: Observable<List[]>;

  @ViewChild(ToolbarComponent, { static: true })
  toolbarComponent!: ToolbarComponent;

  constructor(private store: Store, private route: ActivatedRoute) {
    this.boardID = this.route.snapshot.paramMap.get('id') as string;
    this.boardName = this.route.snapshot.paramMap.get('name') as string;

    this.lists$ = this.store.select(selectListItems);
    this.isTaskModalOpen$ = this.store.select(selectModalTaskOpen);
  }

  ngOnInit(): void {
    this.toolbarComponent.title = this.boardName;

    this.loadUser();
    this.loadLists(this.boardID);
    this.loadTasks(this.boardID);
    this.loadComments(this.boardID);
  }

  public loadUser(): void {
    this.store.dispatch(loadUser());
  }

  public loadLists(boardID: string): void {
    this.store.dispatch(loadLists({ boardID }));
  }

  public loadTasks(boardID: string): void {
    this.store.dispatch(loadTasks({ boardID }));
  }

  public loadComments(boardID: string): void {
    this.store.dispatch(loadComments({ boardID }));
  }

  public closeMenu(target: EventTarget | null): void {
    const el = target as HTMLDivElement;

    if (!el.classList.contains('task-overlay')) return;

    this.store.dispatch(toggleTaskModal());
  }
}
