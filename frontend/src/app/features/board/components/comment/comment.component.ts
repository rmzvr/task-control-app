import { Component, Input } from '@angular/core';
import { User } from '@core/models/user.models';
import { deleteComment, updateComment } from '@core/states/comments';
import { Store } from '@ngrx/store';

@Component({
  selector: 'comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent {
  @Input() comment: any;
  @Input() user!: User;

  public isEditCommentFormOpen: boolean = false;

  constructor(private store: Store) {}

  public toggleEditCommentForm(): void {
    this.isEditCommentFormOpen = !this.isEditCommentFormOpen;
  }

  public updateComment(value: string): void {
    this.store.dispatch(
      updateComment({ comment: { ...this.comment, name: value } })
    );
  }

  public deleteComment(): void {
    this.store.dispatch(
      deleteComment({
        comment: this.comment,
      })
    );
  }
}
