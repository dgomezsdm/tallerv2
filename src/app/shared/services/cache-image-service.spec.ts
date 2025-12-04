import { TestBed } from '@angular/core/testing';

import { CacheImageService } from './cache-image-service';

describe('CacheImageService', () => {
  let service: CacheImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CacheImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
