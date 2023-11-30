import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OilComponent } from './oil.component';

describe('OilComponent', () => {
  let component: OilComponent;
  let fixture: ComponentFixture<OilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OilComponent]
    });
    fixture = TestBed.createComponent(OilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
