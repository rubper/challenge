import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandContainer } from './brand.container';

describe('BrandContainer', () => {
  let component: BrandContainer;
  let fixture: ComponentFixture<BrandContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrandContainer ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
