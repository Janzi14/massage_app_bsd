import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatmentCardFormComponent } from './treatment-card-form.component';

describe('TreatmentCardFormComponent', () => {
  let component: TreatmentCardFormComponent;
  let fixture: ComponentFixture<TreatmentCardFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TreatmentCardFormComponent]
    });
    fixture = TestBed.createComponent(TreatmentCardFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
