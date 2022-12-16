import { Pipe, PipeTransform } from '@angular/core';
import { Comment } from '@core/states/comments';

@Pipe({
  name: 'sortComments',
})
export class SortCommentsPipe implements PipeTransform {
  transform(value: Comment[], taskID: string): Comment[] {
    return value
      .filter((comment: Comment) => comment.taskID === taskID)
      .reverse();
  }
}
