import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comment } from '@core/states/comments';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private http: HttpClient) {}

  public getCommentsByBoardID(id: string | null) {
    return this.http.get(
      `https://serene-plains-22341.herokuapp.com/api/comments/?boardID=${id}`
    );
  }

  public addComment(comment: any) {
    return this.http.post(
      `https://serene-plains-22341.herokuapp.com/api/comments/${comment.taskID}`,
      comment
    );
  }

  public updateComment(comment: Comment) {
    return this.http.put(
      `https://serene-plains-22341.herokuapp.com/api/comments/${comment._id}`,
      comment
    );
  }

  public deleteComment(comment: any) {
    return this.http.delete(
      `https://serene-plains-22341.herokuapp.com/api/comments/${comment._id}`
    );
  }
}
