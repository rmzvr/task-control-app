import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Board, selectEditableBoard, updateBoard } from '@core/states/boards';
import {
  selectModalTitle,
  toggleUpdateBoardModal,
  updateModalTitle,
} from '@core/states/modals';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-board-modal',
  templateUrl: './edit-board-modal.component.html',
  styleUrls: ['./edit-board-modal.component.scss'],
})
export class EditBoardModalComponent {
  public color!: string;

  public title$: Observable<string>;
  public editableBoard$!: Observable<Board | null>;
  public editableBoard!: Board | null;

  public boardForm!: FormGroup;

  constructor(private store: Store) {
    this.title$ = this.store.select(selectModalTitle);
  }

  get name() {
    return this.boardForm.get('name');
  }

  ngOnInit(): void {
    this.updateModalTitle();
    this.editableBoard$ = this.store.select(selectEditableBoard);

    this.editableBoard$.subscribe((board: Board | null) => {
      this.editableBoard = board;

      this.boardForm = new FormGroup({
        name: new FormControl(board?.name, [Validators.required]),
      });
    });
  }

  public setColor(color: string): void {
    this.color = color;
  }

  public closeModal(): void {
    this.store.dispatch(toggleUpdateBoardModal());
    this.store.dispatch(updateModalTitle({ title: '' }));
  }

  public closeModalOnOverlay(event: Event): void {
    const el = event.target as HTMLElement;

    if (!el.getAttribute('data-overlay')) return;

    this.closeModal();
  }

  public updateBoard(): void {
    if (this.boardForm.status === 'INVALID') {
      return;
    }

    if (!this.editableBoard) return;

    this.store.dispatch(
      updateBoard({
        board: {
          ...this.editableBoard,
          name: this.boardForm.value.name,
          background: this.color,
        },
      })
    );

    this.closeModal();
  }

  public updateModalTitle(): void {
    this.store.dispatch(updateModalTitle({ title: 'Edit board' }));
  }
}
