import { Injectable } from '@angular/core';
import { ListBasket } from 'app/contracts/basket/list_basket';
import { ListObject } from 'app/contracts/common/list_object';
import { firstValueFrom, Observable } from 'rxjs';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  constructor(private httpClientService:HttpClientService) { }

  async listBasket(page:number=0, size:number=5,userId:string):Promise<ListBasket>{
    const observable:Observable<ListBasket>=this.httpClientService.get({
      controller:"baskets",
      action:"listByUser",
      queryString:`userId=${userId}`
    });
    return await firstValueFrom(observable) as ListBasket;
  }

  async listBasketItems(page:number=0, size:number=5, basketId:string):Promise<ListObject>{
    const observable:Observable<ListObject>=this.httpClientService.get({
      controller:"basketItems",
      action:"listByBasketItem",
      queryString:`page=${page}&pageSize=${size}&basketId=${basketId}`
    },basketId);
    return await firstValueFrom(observable) as ListObject;
  }
}
