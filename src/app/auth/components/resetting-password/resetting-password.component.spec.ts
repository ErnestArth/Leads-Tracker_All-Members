import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResettingPasswordComponent } from './resetting-password.component';

describe('ResettingPasswordComponent', () => {
  let component: ResettingPasswordComponent;
  let fixture: ComponentFixture<ResettingPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResettingPasswordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResettingPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
