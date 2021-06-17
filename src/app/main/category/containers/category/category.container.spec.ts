import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryContainer } from './category.container';

describe('CategoryContainer', () => {
  let component: CategoryContainer;
  let fixture: ComponentFixture<CategoryContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryContainer ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
