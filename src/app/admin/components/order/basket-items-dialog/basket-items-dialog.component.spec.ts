import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketItemsDialogComponent } from './basket-items-dialog.component';

describe('BasketItemsDialogComponent', () => {
  let component: BasketItemsDialogComponent;
  let fixture: ComponentFixture<BasketItemsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasketItemsDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasketItemsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
