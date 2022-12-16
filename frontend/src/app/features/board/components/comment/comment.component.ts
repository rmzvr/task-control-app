import { Component, Input } from '@angular/core';
import { deleteComment, updateComment } from '@core/states/comments';
import { Store } from '@ngrx/store';

@Component({
  selector: 'comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent {
  @Input() comment: any;
  @Input() user: any;

  public isEditCommentFormOpen: boolean = false;

  constructor(private store: Store) {}

  public toggleEditCommentForm(): void {
    this.isEditCommentFormOpen = !this.isEditCommentFormOpen;
  }

  public updateComment(event: Event, comment: Comment, value: string): void {
    event.preventDefault();

    this.store.dispatch(
      updateComment({ comment: { ...comment, name: value } })
    );

    this.toggleEditCommentForm();
  }

  public deleteComment(event: Event, comment: any): void {
    event.preventDefault();

    this.store.dispatch(
      deleteComment({
        comment,
      })
    );
  }
}
