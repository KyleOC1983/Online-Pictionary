import { TestBed } from '@angular/core/testing';

import { Host.StoreService } from './host.store.service';

describe('Host.StoreService', () => {
  let service: Host.StoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Host.StoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
