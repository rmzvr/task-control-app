import { Component, Input } from '@angular/core';
import { addComment } from '@core/states/comments';
import { Store } from '@ngrx/store';

@Component({
  selector: 'add-comment-form',
  templateUrl: './add-comment-form.component.html',
  styleUrls: ['./add-comment-form.component.scss'],
})
export class AddCommentFormComponent {
  @Input() task: any;
  public isEditCommentFormOpen: boolean = false;
  public isAddCommentFormOpen: boolean = false;

  constructor(private store: Store) {}

  public toggleEditCommentForm(): void {
    this.isEditCommentFormOpen = !this.isEditCommentFormOpen;
  }

  public toggleAddCommentForm(): void {
    this.isAddCommentFormOpen = !this.isAddCommentFormOpen;
  }

  public addComment(event: Event, value: string): void {
    event.preventDefault();

    this.store.dispatch(
      addComment({
        comment: {
          name: value,
          taskID: this.task._id,
          boardID: this.task.boardID,
        },
      })
    );
  }
}
