import { TestBed } from '@angular/core/testing';

import { GraphqlConnectionService } from './graphql-connection.service';

describe('GraphqlConnectionService', () => {
  let service: GraphqlConnectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraphqlConnectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
