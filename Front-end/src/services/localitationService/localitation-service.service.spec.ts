import { TestBed } from '@angular/core/testing';

import { LocalitationServiceService } from './localitation-service.service';

describe('LocalitationServiceService', () => {
  let service: LocalitationServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalitationServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
