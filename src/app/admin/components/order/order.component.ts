import { Component, OnInit } from '@angular/core';
import { ListOrder } from 'app/contracts/order/list_order';
import { OrderService } from 'app/services/common/modals/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(private orderService:OrderService) { }

  completedOrders:ListOrder[]=[];
  livingOrders:ListOrder[]=[];

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
}
