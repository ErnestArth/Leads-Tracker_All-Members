import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTeamLeadComponent } from './dialog-team-lead.component';

describe('DialogTeamLeadComponent', () => {
  let component: DialogTeamLeadComponent;
  let fixture: ComponentFixture<DialogTeamLeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogTeamLeadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogTeamLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
