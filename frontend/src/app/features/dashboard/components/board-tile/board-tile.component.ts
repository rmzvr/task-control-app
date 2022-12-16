import { Component, Input } from '@angular/core';
import { Board, deleteBoard, setEditableBoard } from '@core/states/boards';
import { toggleUpdateBoardModal } from '@core/states/modals';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-board-tile',
  templateUrl: './board-tile.component.html',
  styleUrls: ['./board-tile.component.scss'],
})
export class BoardTileComponent {
  public isMenuOpen: boolean = false;

  @Input() board!: Board;

  constructor(private store: Store) {}

  public toggleMenu(e: Event): void {
    e.stopPropagation();

    this.isMenuOpen = !this.isMenuOpen;
  }

  public toggleUpdateBoardModal(board: Board): void {
    this.store.dispatch(setEditableBoard({ board }));

    this.store.dispatch(toggleUpdateBoardModal());
  }

  public deleteBoard(): void {
    this.store.dispatch(deleteBoard({ board: this.board }));
  }
}
