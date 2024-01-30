import { TestBed } from '@angular/core/testing';

import { WorkersServiceService } from './workers-service.service';

describe('WorkersServiceService', () => {
  let service: WorkersServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkersServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
