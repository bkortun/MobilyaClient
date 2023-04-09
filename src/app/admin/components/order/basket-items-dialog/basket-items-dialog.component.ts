import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseComponent, SpinnerType } from 'app/base/base.component';
import { ListBasketItem } from 'app/contracts/basketItem/list_basketItem';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-basket-items-dialog',
  templateUrl: './basket-items-dialog.component.html',
  styleUrls: ['./basket-items-dialog.component.css']
})
export class BasketItemsDialogComponent extends BaseComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public updateData:any,
  public dialogRef: MatDialogRef<BasketItemsDialogComponent>,spinner:NgxSpinnerService) {
    super(spinner)
    this.showSpinner(SpinnerType.BallPulse)
   }

  basketItems:ListBasketItem[]

  ngOnInit(): void {
    this.basketItems=this.updateData;
    this.hideSpinner(SpinnerType.BallPulse)
  }

}
