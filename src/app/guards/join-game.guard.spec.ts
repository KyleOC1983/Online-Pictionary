import { TestBed } from '@angular/core/testing';

import { JoinGameGuard } from './join-game.guard';

describe('JoinGameGuard', () => {
  let guard: JoinGameGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(JoinGameGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
