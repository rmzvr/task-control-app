import { HttpResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';

import { BoardService } from './board.service';
import { boardsMock } from './board.service.mock';
import { environment } from 'src/environments/environment';

describe('BoardService', () => {
  let service: BoardService;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BoardService],
    }).compileComponents();
  });

  beforeEach(() => {
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(BoardService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('#getBoards', () => {
    const userId = boardsMock[0].userID;
    const url = `https://serene-plains-22341.herokuapp.com/api/boards?userID=${userId}`;

    it('should return boards (called once)', () => {
      service.getBoards(userId).subscribe({
        next: (boards) => expect(boards).toEqual(boardsMock),
        error: fail,
      });

      const req = httpTestingController.expectOne(url);
      expect(req.request.method).toEqual('GET');

      req.flush(boardsMock);
    });

    it('should return expected boards (called multiple times)', () => {
      service.getBoards(userId).subscribe();
      service.getBoards(userId).subscribe();
      service.getBoards(userId).subscribe({
        next: (boards) => expect(boards).toEqual(boardsMock),
        error: fail,
      });

      const req = httpTestingController.match(url);
      expect(req.length).toEqual(3);

      req[0].flush([]);
      req[1].flush(boardsMock[0]);
      req[2].flush(boardsMock);
    });

    it('should be OK returning no boards', () => {
      service.getBoards(userId).subscribe({
        next: (boards) => expect(boards.length).toBe(0),
        error: fail,
      });

      const req = httpTestingController.expectOne(url);

      req.flush([]);
    });
  });

  describe('#getBoard', () => {
    const boardId = boardsMock[0]._id;
    const url = `https://serene-plains-22341.herokuapp.com/api/boards/${boardId}`;

    it('should return board (called once)', () => {
      service.getBoard(boardId).subscribe({
        next: (board) => expect(board).toEqual(boardsMock[0]),
        error: fail,
      });

      const req = httpTestingController.expectOne(url);
      expect(req.request.method).toEqual('GET');

      req.flush(boardsMock[0]);
    });

    it('should return expected board (called multiple times)', () => {
      service.getBoard(boardId).subscribe();
      service.getBoard(boardId).subscribe();
      service.getBoard(boardId).subscribe({
        next: (board) => expect(board).toEqual(boardsMock[0]),
        error: fail,
      });

      const req = httpTestingController.match(url);
      expect(req.length).toEqual(3);

      req[0].flush([]);
      req[1].flush(boardsMock);
      req[2].flush(boardsMock[0]);
    });

    it('should be OK returning no board', () => {
      service.getBoard(boardId).subscribe({
        next: (board) => expect(board).toBeFalsy(),
        error: fail,
      });

      const req = httpTestingController.expectOne(url);

      req.flush(null);
    });
  });

  describe('#addBoard', () => {
    const url = `https://serene-plains-22341.herokuapp.com/api/boards`;

    it('should add board', () => {
      service.addBoard(boardsMock[0]).subscribe({
        next: (data) => expect(data).toBeTruthy(),
        error: fail,
      });

      const req = httpTestingController.expectOne(url);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(boardsMock[0]);

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

  describe('#updateBoard', () => {
    const boardId = boardsMock[0]._id;
    const url = `https://serene-plains-22341.herokuapp.com/api/boards/${boardId}`;

    it('should update board', () => {
      const data = {
        name: boardsMock[0].name,
        background: boardsMock[0].background,
      };

      service.updateBoard(boardsMock[0]).subscribe({
        next: (data) => expect(data).toBeTruthy(),
        error: fail,
      });

      const req = httpTestingController.expectOne(url);
      expect(req.request.method).toEqual('PUT');
      expect(req.request.body).toEqual(data);

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

  describe('#deleteBoard', () => {
    const boardId = boardsMock[0]._id;
    const url = `https://serene-plains-22341.herokuapp.com/api/boards/${boardId}`;

    it('should delete board', () => {
      service.deleteBoard(boardsMock[0]).subscribe({
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
