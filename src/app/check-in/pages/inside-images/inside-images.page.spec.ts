import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InsideImagesPage } from './inside-images.page';

describe('InsideImagesPage', () => {
  let component: InsideImagesPage;
  let fixture: ComponentFixture<InsideImagesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InsideImagesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
