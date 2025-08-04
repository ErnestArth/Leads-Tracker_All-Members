import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTeamLeadPopupComponent } from './add-team-lead-popup.component';

describe('AddTeamLeadPopupComponent', () => {
  let component: AddTeamLeadPopupComponent;
  let fixture: ComponentFixture<AddTeamLeadPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddTeamLeadPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTeamLeadPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
