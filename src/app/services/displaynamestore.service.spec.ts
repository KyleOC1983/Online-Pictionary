import { TestBed } from '@angular/core/testing';

import { DisplaynamestoreService } from './displaynamestore.service';

describe('DisplaynamestoreService', () => {
  let service: DisplaynamestoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisplaynamestoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
