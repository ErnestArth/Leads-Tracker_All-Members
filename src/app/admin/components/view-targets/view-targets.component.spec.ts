import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTargetsComponent } from './view-targets.component';

describe('ViewTargetsComponent', () => {
  let component: ViewTargetsComponent;
  let fixture: ComponentFixture<ViewTargetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewTargetsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewTargetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
