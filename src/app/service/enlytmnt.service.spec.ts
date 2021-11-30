import { TestBed } from '@angular/core/testing';

import { EnlytmntService } from './enlytmnt.service';

describe('EnlytmntService', () => {
  let service: EnlytmntService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnlytmntService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
