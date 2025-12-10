import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VehicleInteriorPage } from './vehicle-interior.page';

describe('VehicleInteriorPage', () => {
  let component: VehicleInteriorPage;
  let fixture: ComponentFixture<VehicleInteriorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleInteriorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
