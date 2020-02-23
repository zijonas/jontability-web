import { TestBed } from '@angular/core/testing';

import { PostFilterService } from './post-filter.service';

describe('PostFilterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PostFilterService = TestBed.get(PostFilterService);
    expect(service).toBeTruthy();
  });
});
