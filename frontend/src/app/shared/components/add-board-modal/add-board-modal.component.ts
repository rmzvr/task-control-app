import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { addBoard } from '@core/states/boards';
import {
  selectModalTitle,
  toggleAddBoardModal,
  updateModalTitle,
} from '@core/states/modals';
import { selectUser, User } from '@core/states/user';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-board-modal',
  templateUrl: './add-board-modal.component.html',
  styleUrls: ['./add-board-modal.component.scss'],
})
export class AddBoardModalComponent implements OnInit {
  public color: string = '#0079bf';

  public title$: Observable<string>;
  public user$: Observable<User | null>;

  public boardForm: FormGroup;
  public userID!: string;

  constructor(private store: Store) {
    this.boardForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });

    this.title$ = this.store.select(selectModalTitle);
    this.user$ = this.store.select(selectUser);

    this.user$.subscribe((user) => {
      this.userID = user?._id as string;
    });
  }

  ngOnInit(): void {
    this.updateModalTitle();
  }

  public setColor(color: string): void {
    this.color = color;
  }

  public closeModal(): void {
    this.store.dispatch(toggleAddBoardModal());
    this.store.dispatch(updateModalTitle({ title: '' }));
  }

  public closeModalOnOverlay(event: Event): void {
    const el = event.target as HTMLElement;

    if (!el.getAttribute('data-overlay')) return;

    this.closeModal();
  }

  public addBoard(): void {
    if (this.boardForm.status === 'INVALID') {
      return;
    }

    this.store.dispatch(
      addBoard({
        board: {
          ...this.boardForm.value,
          background: this.color,
          userID: this.userID,
        },
      })
    );
  }

  public updateModalTitle(): void {
    this.store.dispatch(updateModalTitle({ title: 'Create board' }));
  }

  get name() {
    return this.boardForm.get('name');
  }

  get description() {
    return this.boardForm.get('description');
  }
}
