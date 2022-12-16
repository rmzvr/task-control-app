import { TestBed } from '@angular/core/testing';

import { DroppableService } from './droppable.service';

describe('DroppableService', () => {
  let service: DroppableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DroppableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
