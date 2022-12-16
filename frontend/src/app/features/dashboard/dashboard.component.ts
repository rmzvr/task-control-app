import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  Board,
  loadBoards,
  selectBoardItems,
  selectStatus,
} from 'src/app/core/states/boards';
import {
  selectIsAddBoardModalOpen,
  toggleAddBoardModal,
  selectIsEditBoardModalOpen,
} from 'src/app/core/states/modals';
import { selectToolbarValues, ToolbarState } from '@core/states/toolbar';
import { loadUser, selectUser, User } from '@core/states/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public searchType: string = 'board';

  public isAddBoardModalOpen$: Observable<boolean>;
  public isEditBoardModalOpen$: Observable<boolean>;

  public toolbarValues$: Observable<ToolbarState>;

  public boards$: Observable<Board[]>;
  public user$: Observable<User | null>;

  public status$: Observable<any>;

  constructor(private store: Store) {
    this.isAddBoardModalOpen$ = this.store.select(selectIsAddBoardModalOpen);
    this.isEditBoardModalOpen$ = this.store.select(selectIsEditBoardModalOpen);

    this.toolbarValues$ = this.store.select(selectToolbarValues);

    this.boards$ = this.store.select(selectBoardItems);
    this.user$ = this.store.select(selectUser);
    this.status$ = this.store.select(selectStatus);
  }

  ngOnInit(): void {
    this.store.dispatch(loadUser());

    this.user$.subscribe((user) => {
      if (!user) return;
      this.store.dispatch(loadBoards({ id: user?._id }));
    });
  }

  public toggleAddBoardModal(): void {
    this.store.dispatch(toggleAddBoardModal());
  }
}
