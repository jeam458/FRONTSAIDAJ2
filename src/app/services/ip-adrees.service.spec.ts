import { TestBed } from '@angular/core/testing';

import { IpAdreesService } from './ip-adrees.service';

describe('IpAdreesService', () => {
  let service: IpAdreesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IpAdreesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
