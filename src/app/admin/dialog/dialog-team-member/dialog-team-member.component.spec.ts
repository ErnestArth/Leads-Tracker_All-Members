import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTeamMemberComponent } from './dialog-team-member.component';

describe('DialogTeamMemberComponent', () => {
  let component: DialogTeamMemberComponent;
  let fixture: ComponentFixture<DialogTeamMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogTeamMemberComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogTeamMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
