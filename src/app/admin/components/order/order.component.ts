import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ListBasketItem } from 'app/contracts/basketItem/list_basketItem';
import { ListOrder } from 'app/contracts/order/list_order';
import { BasketService } from 'app/services/common/modals/basket.service';
import { OrderService } from 'app/services/common/modals/order.service';
import { BasketItemsDialogComponent } from './basket-items-dialog/basket-items-dialog.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(private orderService:OrderService, private basketService:BasketService,
    public dialog: MatDialog) { }

  completedOrders:ListOrder[]=[];
  livingOrders:ListOrder[]=[];
  basketItems:ListBasketItem[]

  ngOnInit(): void {
    this.listOrders()
  }

  panelOpenState = false;

  async listOrders(){
    const list=await this.orderService.list(0,50)
    for(let i=0;list.count;i++){
      if(list.items[i].isComplete || list.items[i].isCancel){
        this.completedOrders.push(list.items[i]);
      }
      else{
        this.livingOrders.push(list.items[i]);
      }
    }

    console.log(list)
  }

  async completeOrder(orderId:string){
    await this.orderService.completeOrder(orderId);
  }

  async cancelOrder(orderId:string){
    await this.orderService.cancelOrder(orderId);
  }

  async getBasketItems(basketId:string){
    const list=await this.basketService.listBasketItems(0,50,basketId);
    this.basketItems=list.items;
    this.openDialog();
  }

  openDialog() {
    const dialogRef=this.dialog.open(BasketItemsDialogComponent, {
      width: "50%",
      height: "75%",
      data:this.basketItems
    });
  }
}
