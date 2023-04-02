import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { firstValueFrom, Observable } from 'rxjs';
import { CreateOrder } from 'app/contracts/order/create_order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClientService:HttpClientService) { }

  async create(createOrder:CreateOrder){
    const observable= this.httpClientService.post({
      controller:"orders",
    },createOrder)
    const addedOrder= await firstValueFrom(observable);
    return addedOrder;
  }
}
