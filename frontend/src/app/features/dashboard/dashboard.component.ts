import { Component, OnInit } from '@angular/core';
import {
  combineLatest,
  map,
  Observable,
} from 'rxjs';
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

    this.boards$ = combineLatest([
      this.boards$,
      this.toolbarValues$.pipe(map((v) => v.search)),
      this.toolbarValues$.pipe(map((v) => v.sort)),
      this.toolbarValues$.pipe(map((v) => v.order)),
    ]).pipe(
      map(([boards, search, sort, order]) => {
        const el = ['new', 'progress', 'done'];

        let sortedBoards;

        const filteredBoards = [...boards].filter((board: any) =>
          board.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        );

        if (sort === 'name' || sort === 'created_date') {
          sortedBoards = [...filteredBoards].sort((a: any, b: any) => {
            return a[sort]
              .toLocaleLowerCase()
              .localeCompare(b[sort].toLocaleLowerCase());
          });
        } else {
          sortedBoards = [...filteredBoards].sort((a: any, b: any) => {
            let aLength = a.lists[el.indexOf(sort)].tasks.length;
            let bLength = b.lists[el.indexOf(sort)].tasks.length;

            return bLength - aLength;
          });
        }

        return order === 'asc' ? sortedBoards : sortedBoards.reverse();
      })
    );
  }

  public toggleAddBoardModal(): void {
    this.store.dispatch(toggleAddBoardModal());
  }
}
