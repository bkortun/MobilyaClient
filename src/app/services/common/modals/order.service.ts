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

  async create(createOrder:CreateOrder){
    const observable= this.httpClientService.post({
      controller:"orders",
    },createOrder)
    const addedOrder= await firstValueFrom(observable);
    return addedOrder;
  }

  async list(page:number=0, size:number=5){
    const observable:Observable<ListObject>=this.httpClientService.get({
      controller:"orders",
      queryString:`page=${page}&pageSize=${size}`
    })
    return await firstValueFrom(observable) as ListObject;
  }
}
