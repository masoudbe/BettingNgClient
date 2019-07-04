import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowPlayersComponent } from './follow-players.component';

describe('FollowPlayersComponent', () => {
  let component: FollowPlayersComponent;
  let fixture: ComponentFixture<FollowPlayersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowPlayersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowPlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
