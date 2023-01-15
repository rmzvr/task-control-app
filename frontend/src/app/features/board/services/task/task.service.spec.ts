import { HttpResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { TaskService } from './task.service';
import { tasksMock } from './task.service.mock';

describe('TaskService', () => {
  let service: TaskService;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskService],
    }).compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(TaskService);
  });

  beforeEach(() => {
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(TaskService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('#getTasksByBoardID', () => {
    const boardID = tasksMock[0].boardID;
    const url = `https://serene-plains-22341.herokuapp.com/api/tasks/board/?boardID=${boardID}`;

    it('should return tasks by board id (called once)', () => {
      service.getTasksByBoardID(boardID).subscribe({
        next: (tasks) => expect(tasks).toEqual(tasksMock),
        error: fail,
      });

      const req = httpTestingController.expectOne(url);
      expect(req.request.method).toEqual('GET');

      req.flush(tasksMock);
    });

    it('should return expected tasks (called multiple times)', () => {
      service.getTasksByBoardID(boardID).subscribe();
      service.getTasksByBoardID(boardID).subscribe();
      service.getTasksByBoardID(boardID).subscribe({
        next: (tasks) => expect(tasks).toEqual(tasksMock),
        error: fail,
      });

      const req = httpTestingController.match(url);
      expect(req.length).toEqual(3);

      req[0].flush([]);
      req[1].flush(tasksMock[0]);
      req[2].flush(tasksMock);
    });

    it('should be OK returning no tasks', () => {
      service.getTasksByBoardID(boardID).subscribe({
        next: (tasks) => expect(tasks.length).toBe(0),
        error: fail,
      });

      const req = httpTestingController.expectOne(url);

      req.flush([]);
    });
  });

  describe('#addTask', () => {
    const listID = tasksMock[0].listID;
    const url = `https://serene-plains-22341.herokuapp.com/api/tasks/?listID=${listID}`;

    it('should add task', () => {
      service.addTask(tasksMock[0]).subscribe({
        next: (data) => expect(data).toBeTruthy(),
        error: fail,
      });

      const req = httpTestingController.expectOne(url);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(tasksMock[0]);

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

  describe('#updateTask', () => {
    const taskId = tasksMock[0]._id;
    const url = `https://serene-plains-22341.herokuapp.com/api/tasks/${taskId}`;

    it('should update task', () => {
      service.updateTask(tasksMock[0]).subscribe({
        next: (data) => expect(data).toBeTruthy(),
        error: fail,
      });

      const req = httpTestingController.expectOne(url);
      expect(req.request.method).toEqual('PUT');
      expect(req.request.body).toEqual(tasksMock[0]);

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

  describe('#deleteTask', () => {
    const taskId = tasksMock[0]._id;
    const url = `https://serene-plains-22341.herokuapp.com/api/tasks/${taskId}`;

    it('should delete task', () => {
      service.deleteTask(tasksMock[0]).subscribe({
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
