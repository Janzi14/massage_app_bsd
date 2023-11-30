import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOilComponent } from './create-oil.component';

describe('CreateOilComponent', () => {
  let component: CreateOilComponent;
  let fixture: ComponentFixture<CreateOilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateOilComponent]
    });
    fixture = TestBed.createComponent(CreateOilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
