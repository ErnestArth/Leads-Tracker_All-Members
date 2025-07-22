import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTeamMemberComponent } from './create-team-member.component';

describe('CreateTeamMemberComponent', () => {
  let component: CreateTeamMemberComponent;
  let fixture: ComponentFixture<CreateTeamMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateTeamMemberComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTeamMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
