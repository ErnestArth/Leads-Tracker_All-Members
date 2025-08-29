import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresetTargetComponent } from './preset-target.component';

describe('PresetTargetComponent', () => {
  let component: PresetTargetComponent;
  let fixture: ComponentFixture<PresetTargetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PresetTargetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PresetTargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
