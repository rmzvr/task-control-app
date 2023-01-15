import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comment } from '@core/states/comments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private http: HttpClient) {}

  public getCommentsByBoardID(id: string): Observable<Comment[]> {
    return this.http.get(
      `https://serene-plains-22341.herokuapp.com/api/comments/?boardID=${id}`
    ) as Observable<Comment[]>;
  }

  public addComment(comment: Comment): Observable<string> {
    return this.http.post(
      `https://serene-plains-22341.herokuapp.com/api/comments/${comment.taskID}`,
      comment
    ) as Observable<string>;
  }

  public updateComment(comment: Comment): Observable<string> {
    return this.http.put(
      `https://serene-plains-22341.herokuapp.com/api/comments/${comment._id}`,
      comment
    ) as Observable<string>;
  }

  public deleteComment(comment: Comment): Observable<string> {
    return this.http.delete(
      `https://serene-plains-22341.herokuapp.com/api/comments/${comment._id}`
    ) as Observable<string>;
  }
}
