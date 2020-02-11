import { TestBed } from '@angular/core/testing';

import { PostSumService } from './post-sum.service';

describe('PostSumService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PostSumService = TestBed.get(PostSumService);
    expect(service).toBeTruthy();
  });
});
