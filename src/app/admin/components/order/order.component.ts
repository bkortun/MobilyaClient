import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ListBasketItem } from 'app/contracts/basketItem/list_basketItem';
import { ListOrder } from 'app/contracts/order/list_order';
import { BasketService } from 'app/services/common/modals/basket.service';
import { OrderService } from 'app/services/common/modals/order.service';
import { BasketItemsDialogComponent } from './basket-items-dialog/basket-items-dialog.component';
import { AlertifyMessageType, AlertifyPosition, AlertifyService } from 'app/services/admin/alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'app/base/base.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent extends BaseComponent implements OnInit {

  constructor(private orderService:OrderService, private basketService:BasketService,
    public dialog: MatDialog, private alertifyService:AlertifyService, spinner:NgxSpinnerService) {
      super(spinner)
      this.showSpinner(SpinnerType.BallPulse)
     }

  completedOrders:ListOrder[]=[];
  livingOrders:ListOrder[]=[];
  basketItems:ListBasketItem[]

  ngOnInit(): void {
    this.listOrders()
    this.hideSpinner(SpinnerType.BallPulse)
  }

  panelOpenState = false;

  async listOrders(){
    const list=await this.orderService.list(0,50)
    for(let i=0;list.count;i++){
      console.log(list.items[i])
      if(list.items[i].isCompleted || list.items[i].isCanceled){
        console.log(list.items[i])
        this.completedOrders.push(list.items[i]);
      }
      else{
        console.log(list.items[i])

        this.livingOrders.push(list.items[i]);
      }
    }

    console.log(list)
  }

  async completeOrder(orderId:string){
    this.showSpinner(SpinnerType.BallPulse)
    await this.orderService.completeOrder(orderId,()=>{
      this.alertifyService.message("Sipariş tamamlandı.",{
        messageType:AlertifyMessageType.Success,
        position:AlertifyPosition.BottomRight
      })
      this.completedOrders=[];
      this.livingOrders=[];
      this.listOrders();
    });
    this.hideSpinner(SpinnerType.BallPulse)
  }

  async cancelOrder(orderId:string){
    this.showSpinner(SpinnerType.BallPulse)
    await this.orderService.cancelOrder(orderId,()=>{
      this.alertifyService.message("Sipariş iptal edildi.",{
        messageType:AlertifyMessageType.Warning,
        position:AlertifyPosition.BottomRight
      })
      this.completedOrders=[];
      this.livingOrders=[];
      this.listOrders();
    });
    this.hideSpinner(SpinnerType.BallPulse)
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
