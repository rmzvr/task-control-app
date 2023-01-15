import { HttpResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { CommentService } from './comment.service';
import { commentsMock } from './comment.service.mock';

describe('CommentService', () => {
  let service: CommentService;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CommentService],
    }).compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(CommentService);
  });

  beforeEach(() => {
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(CommentService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('#getCommentsByBoardID', () => {
    const boardID = commentsMock[0].boardID;
    const url = `https://serene-plains-22341.herokuapp.com/api/comments/?boardID=${boardID}`;

    it('should return comments by board id (called once)', () => {
      service.getCommentsByBoardID(boardID).subscribe({
        next: (comments) => expect(comments).toEqual(commentsMock),
        error: fail,
      });

      const req = httpTestingController.expectOne(url);
      expect(req.request.method).toEqual('GET');

      req.flush(commentsMock);
    });

    it('should return expected comments (called multiple times)', () => {
      service.getCommentsByBoardID(boardID).subscribe();
      service.getCommentsByBoardID(boardID).subscribe();
      service.getCommentsByBoardID(boardID).subscribe({
        next: (comments) => expect(comments).toEqual(commentsMock),
        error: fail,
      });

      const req = httpTestingController.match(url);
      expect(req.length).toEqual(3);

      req[0].flush([]);
      req[1].flush(commentsMock[0]);
      req[2].flush(commentsMock);
    });

    it('should be OK returning no comments', () => {
      service.getCommentsByBoardID(boardID).subscribe({
        next: (comments) => expect(comments.length).toBe(0),
        error: fail,
      });

      const req = httpTestingController.expectOne(url);

      req.flush([]);
    });
  });

  describe('#addComment', () => {
    const taskId = commentsMock[0].taskID;
    const url = `https://serene-plains-22341.herokuapp.com/api/comments/${taskId}`;

    it('should add comment', () => {
      service.addComment(commentsMock[0]).subscribe({
        next: (data) => expect(data).toBeTruthy(),
        error: fail,
      });

      const req = httpTestingController.expectOne(url);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(commentsMock[0]);

      const res = new HttpResponse({
        status: 200,
        statusText: 'OK',
        body: {
          success: true,
        },
      });

      req.event(res);
    });
  });

  describe('#updateComment', () => {
    const commentId = commentsMock[0]._id;
    const url = `https://serene-plains-22341.herokuapp.com/api/comments/${commentId}`;

    it('should update comment', () => {
      service.updateComment(commentsMock[0]).subscribe({
        next: (data) => expect(data).toBeTruthy(),
        error: fail,
      });

      const req = httpTestingController.expectOne(url);
      expect(req.request.method).toEqual('PUT');
      expect(req.request.body).toEqual(commentsMock[0]);

      const res = new HttpResponse({
        status: 200,
        statusText: 'OK',
        body: {
          success: true,
        },
      });

      req.event(res);
    });
  });

  describe('#deleteComment', () => {
    const commentId = commentsMock[0]._id;
    const url = `https://serene-plains-22341.herokuapp.com/api/comments/${commentId}`;

    it('should delete comment', () => {
      service.deleteComment(commentsMock[0]).subscribe({
        next: (data) => expect(data).toBeTruthy(),
        error: fail,
      });

      const req = httpTestingController.expectOne(url);
      expect(req.request.method).toEqual('DELETE');

      const res = new HttpResponse({
        status: 200,
        statusText: 'OK',
        body: {
          success: true,
        },
      });

      req.event(res);
    });
  });
});
