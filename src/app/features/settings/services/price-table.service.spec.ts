import { TestBed } from '@angular/core/testing';

import { PriceTableService } from './price-table.service';

describe('PriceTableService', () => {
  let service: PriceTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PriceTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
