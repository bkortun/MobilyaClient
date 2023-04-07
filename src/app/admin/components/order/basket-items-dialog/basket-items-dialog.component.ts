import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ListBasketItem } from 'app/contracts/basketItem/list_basketItem';

@Component({
  selector: 'app-basket-items-dialog',
  templateUrl: './basket-items-dialog.component.html',
  styleUrls: ['./basket-items-dialog.component.css']
})
export class BasketItemsDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public updateData:any, public dialogRef: MatDialogRef<BasketItemsDialogComponent>,) { }

  basketItems:ListBasketItem[]

  ngOnInit(): void {
    this.basketItems=this.updateData;
  }

}
