import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { firstValueFrom, Observable } from 'rxjs';
import { CreateOrder } from 'app/contracts/order/create_order';
import { ListObject } from 'app/contracts/common/list_object';
import { ListOrderByUser } from 'app/contracts/order/listByUser_order';

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

  async listByUserId(userId:string){
    const observable:Observable<ListObject>=this.httpClientService.get({
      controller:"orders",
      action:`ListByUserId`
    },userId)
    return await firstValueFrom(observable) as ListObject;
  }

  async completeOrder(orderId:string,callBackFunction?:()=>void){
    const observable= this.httpClientService.put({
      controller:"orders",
      action:"Complete",
      queryString:`orderId=${orderId}`
    },orderId)
    const response= await firstValueFrom(observable);
    callBackFunction();
    return response;
  }
  async cancelOrder(orderId:string,callBackFunction?:()=>void){
    const observable= this.httpClientService.put({
      controller:"orders",
      action:"Cancel",
      queryString:`orderId=${orderId}`
    },orderId)
    const response= await firstValueFrom(observable);
    callBackFunction();
    return response;
  }
}
