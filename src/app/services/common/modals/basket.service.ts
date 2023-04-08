import { Injectable } from '@angular/core';
import { ListBasket } from 'app/contracts/basket/list_basket';
import { CreateBasketItem } from 'app/contracts/basketItem/create_basketItem';
import { UpdateBasketItemQuantity } from 'app/contracts/basketItem/update_basketItemQuantity';
import { ListObject } from 'app/contracts/common/list_object';
import { firstValueFrom, Observable } from 'rxjs';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  constructor(private httpClientService:HttpClientService) { }

  async listBasket(userId:string):Promise<ListBasket>{
    const observable:Observable<ListBasket>=this.httpClientService.get({
      controller:"baskets",
      action:"listByUser",
      queryString:`userId=${userId}`
    });
    return await firstValueFrom(observable) as ListBasket;
  }

  async createBasketItem(basketItem:CreateBasketItem, callBackFunction?:()=>void):Promise<CreateBasketItem>{
    const observable:Observable<any|CreateBasketItem>= this.httpClientService.post<CreateBasketItem>({
      controller:"basketItems",
    },basketItem)
    const addedBasketItem:CreateBasketItem= await firstValueFrom(observable) as CreateBasketItem;
    callBackFunction();
    return addedBasketItem;
  }

  async listBasketItems(page:number=0, size:number=5, basketId:string):Promise<ListObject>{
    const observable:Observable<ListObject>=this.httpClientService.get({
      controller:"basketItems",
      action:"listByBasket",
      queryString:`page=${page}&pageSize=${size}&basketId=${basketId}`
    });
    return await firstValueFrom(observable) as ListObject;
  }

  async changeQuantity(id:string,quantity:number):Promise<UpdateBasketItemQuantity>{
    const observable=this.httpClientService.put({
      controller:"basketItems",
      action:"UpdateQuantity",
    },{id,quantity});
    return await firstValueFrom(observable) as UpdateBasketItemQuantity;
  }

  async deleteBasketItem(basketItemId:string, callBackFunction?:()=>void){
    const observable= this.httpClientService.delete({
      controller:"BasketItems",
    },basketItemId);
    const deletedBasketItem= await firstValueFrom(observable);
    callBackFunction();
    return deletedBasketItem;
  }
}
