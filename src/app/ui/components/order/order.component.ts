import { Component, OnInit } from '@angular/core';
import { BaseComponent, SpinnerType } from 'app/base/base.component';
import { ListBasketItem } from 'app/contracts/basketItem/list_basketItem';
import { ListOrderByUser } from 'app/contracts/order/listByUser_order';
import { ListOrder } from 'app/contracts/order/list_order';
import { AuthService } from 'app/services/common/modals/auth.service';
import { BasketService } from 'app/services/common/modals/basket.service';
import { OrderService } from 'app/services/common/modals/order.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent extends BaseComponent implements OnInit {

  constructor(spinner:NgxSpinnerService, private orderService:OrderService,private basketService:BasketService,private authService:AuthService) {
    super(spinner)
    this.showSpinner(SpinnerType.BallClimbingDot)
  }

  completedOrders:ListOrderByUser[]=[];
  livingOrders:ListOrderByUser[]=[];
  basketItems:ListBasketItem[]

  ngOnInit(): void {
    this.listOrders()
    this.hideSpinner(SpinnerType.BallClimbingDot)
  }

  panelOpenState = false;

  async listOrders(){
    const userId = this.authService.decodeToken().nameIdentifier;
    const list=await this.orderService.listByUserId(userId)
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

}
