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
  @Input() board!: Board;

  public isMenuOpen: boolean = false;

  constructor(private store: Store) {}

  public toggleMenu(e: Event): void {
    e.stopPropagation();

    this.isMenuOpen = !this.isMenuOpen;
  }

  public toggleUpdateBoardModal(): void {
    this.store.dispatch(toggleUpdateBoardModal());
  }

  public setEditableBoard(): void {
    this.store.dispatch(setEditableBoard({ board: this.board }));
  }

  public deleteBoard(): void {
    this.store.dispatch(deleteBoard({ board: this.board }));
  }
}
