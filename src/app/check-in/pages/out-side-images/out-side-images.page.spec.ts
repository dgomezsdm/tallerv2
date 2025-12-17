import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OutSideIimagesPage } from './out-side-images.page';

describe('OutSideIimagesPage', () => {
  let component: OutSideIimagesPage;
  let fixture: ComponentFixture<OutSideIimagesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OutSideIimagesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
