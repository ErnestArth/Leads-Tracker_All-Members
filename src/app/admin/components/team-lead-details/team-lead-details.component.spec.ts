import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamLeadDetailsComponent } from './team-lead-details.component';

describe('TeamLeadDetailsComponent', () => {
  let component: TeamLeadDetailsComponent;
  let fixture: ComponentFixture<TeamLeadDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeamLeadDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamLeadDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
