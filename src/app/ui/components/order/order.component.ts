import { Component, OnInit } from '@angular/core';
import { BaseComponent, SpinnerType } from 'app/base/base.component';
import { ListBasketItem } from 'app/contracts/basketItem/list_basketItem';
import { ListOrder } from 'app/contracts/order/list_order';
import { BasketService } from 'app/services/common/modals/basket.service';
import { OrderService } from 'app/services/common/modals/order.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent extends BaseComponent implements OnInit {

  constructor(spinner:NgxSpinnerService, private orderService:OrderService,private basketService:BasketService) {
    super(spinner)
    this.showSpinner(SpinnerType.BallClimbingDot)
  }

  completedOrders:ListOrder[]=[];
  livingOrders:ListOrder[]=[];
  basketItems:ListBasketItem[]

  ngOnInit(): void {
    this.listOrders()
    this.hideSpinner(SpinnerType.BallClimbingDot)
  }

  panelOpenState = false;

  //Todo
  //bu tüm orderları getiriyor kullanıcının siparişleri getirtilecek
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

}
