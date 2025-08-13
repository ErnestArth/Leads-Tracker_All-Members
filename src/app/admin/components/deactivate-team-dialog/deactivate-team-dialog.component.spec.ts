import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeactivateTeamDialogComponent } from './deactivate-team-dialog.component';

describe('DeactivateTeamDialogComponent', () => {
  let component: DeactivateTeamDialogComponent;
  let fixture: ComponentFixture<DeactivateTeamDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeactivateTeamDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeactivateTeamDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
