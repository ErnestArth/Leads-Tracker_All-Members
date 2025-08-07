import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetTargetsComponent } from './set-targets.component';

describe('SetTargetsComponent', () => {
  let component: SetTargetsComponent;
  let fixture: ComponentFixture<SetTargetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SetTargetsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetTargetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
