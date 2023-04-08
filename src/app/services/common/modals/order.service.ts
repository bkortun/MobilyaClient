import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { firstValueFrom, Observable } from 'rxjs';
import { CreateOrder } from 'app/contracts/order/create_order';
import { ListObject } from 'app/contracts/common/list_object';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClientService:HttpClientService) { }

  async create(createOrder:CreateOrder, callBackFunction?:()=>void){
    const observable= this.httpClientService.post({
      controller:"orders",
    },createOrder)
    const addedOrder= await firstValueFrom(observable);
    callBackFunction();
    return addedOrder;
  }

  async list(page:number=0, size:number=5){
    const observable:Observable<ListObject>=this.httpClientService.get({
      controller:"orders",
      queryString:`page=${page}&pageSize=${size}`
    })
    return await firstValueFrom(observable) as ListObject;
  }

  async completeOrder(orderId:string){
    const observable= this.httpClientService.put({
      controller:"orders",
      action:"isCompleted",
      queryString:`orderId=${orderId}`
    },orderId)
    const response= await firstValueFrom(observable);
    return response;
  }
  async cancelOrder(orderId:string){
    const observable= this.httpClientService.put({
      controller:"orders",
      action:"isCanceled",
      queryString:`orderId=${orderId}`
    },orderId)
    const response= await firstValueFrom(observable);
    return response;
  }
}
