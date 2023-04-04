import { Component, OnInit } from '@angular/core';
import { OrderService } from 'app/services/common/modals/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(private orderService:OrderService) { }

  ngOnInit(): void {
  }

  panelOpenState = false;

  async listOrders(){
    const list=this.orderService.list(0,50)

  }

}
