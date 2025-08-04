import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTeamMemberPopupComponent } from './add-team-member-popup.component';

describe('AddTeamMemberPopupComponent', () => {
  let component: AddTeamMemberPopupComponent;
  let fixture: ComponentFixture<AddTeamMemberPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddTeamMemberPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTeamMemberPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
