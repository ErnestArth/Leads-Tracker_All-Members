import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeactivateTeamModalComponent } from './deactivate-team-modal.component';

describe('DeactivateTeamModalComponent', () => {
  let component: DeactivateTeamModalComponent;
  let fixture: ComponentFixture<DeactivateTeamModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeactivateTeamModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DeactivateTeamModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
