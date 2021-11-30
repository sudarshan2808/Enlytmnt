import { TestBed } from '@angular/core/testing';

import { StaticDropdownService } from './static-dropdown.service';

describe('StaticDropdownService', () => {
  let service: StaticDropdownService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StaticDropdownService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
