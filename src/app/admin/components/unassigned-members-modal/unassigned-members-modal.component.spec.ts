import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnassignedMembersModalComponent } from './unassigned-members-modal.component';

describe('UnassignedMembersModalComponent', () => {
  let component: UnassignedMembersModalComponent;
  let fixture: ComponentFixture<UnassignedMembersModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UnassignedMembersModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnassignedMembersModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
