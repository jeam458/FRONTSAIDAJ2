import { TestBed } from '@angular/core/testing';

import { ActoprocesalService } from './actoprocesal.service';

describe('ActoprocesalService', () => {
  let service: ActoprocesalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActoprocesalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
