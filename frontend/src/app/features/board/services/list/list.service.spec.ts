import { HttpResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { ListService } from './list.service';
import { listsMock } from './list.service.mock';

describe('ListService', () => {
  let service: ListService;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ListService],
    }).compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ListService);
  });

  beforeEach(() => {
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ListService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('#getLists', () => {
    const boardID = listsMock[0].boardID;
    const url = `https://serene-plains-22341.herokuapp.com/api/lists/?boardID=${boardID}`;

    it('should return lists by board id (called once)', () => {
      service.getLists(boardID).subscribe({
        next: (lists) => expect(lists).toEqual(listsMock),
        error: fail,
      });

      const req = httpTestingController.expectOne(url);
      expect(req.request.method).toEqual('GET');

      req.flush(listsMock);
    });

    it('should return expected lists (called multiple times)', () => {
      service.getLists(boardID).subscribe();
      service.getLists(boardID).subscribe();
      service.getLists(boardID).subscribe({
        next: (lists) => expect(lists).toEqual(listsMock),
        error: fail,
      });

      const req = httpTestingController.match(url);
      expect(req.length).toEqual(3);

      req[0].flush([]);
      req[1].flush(listsMock[0]);
      req[2].flush(listsMock);
    });

    it('should be OK returning no lists', () => {
      service.getLists(boardID).subscribe({
        next: (lists) => expect(lists.length).toBe(0),
        error: fail,
      });

      const req = httpTestingController.expectOne(url);

      req.flush([]);
    });
  });

  describe('#updateList', () => {
    const listId = listsMock[0]._id;
    const url = `https://serene-plains-22341.herokuapp.com/api/lists/${listId}`;

    it('should update list', () => {
      const data = { background: listsMock[0].background };

      service.updateList(listsMock[0]).subscribe({
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
});
