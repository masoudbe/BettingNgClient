import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowTeamsComponent } from './follow-teams.component';

describe('FollowTeamsComponent', () => {
  let component: FollowTeamsComponent;
  let fixture: ComponentFixture<FollowTeamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowTeamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
