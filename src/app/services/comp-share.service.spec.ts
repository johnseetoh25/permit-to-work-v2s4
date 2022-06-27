import { TestBed } from '@angular/core/testing';

import { CompShareService } from './comp-share.service';

describe('CompShareService', () => {
  let service: CompShareService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompShareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
