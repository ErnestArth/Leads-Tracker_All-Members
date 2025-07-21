import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignMembersModalComponent } from './assign-members-modal.component';

describe('AssignMembersModalComponent', () => {
  let component: AssignMembersModalComponent;
  let fixture: ComponentFixture<AssignMembersModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssignMembersModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignMembersModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
