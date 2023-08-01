import { TestBed } from '@angular/core/testing';

import { ToolResolverService } from './tool-resolver.service';

describe('ToolResolverService', () => {
  let service: ToolResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToolResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
