import { Injectable } from '@angular/core';
import { ListObject } from 'app/contracts/common/list_object';
import { ListProductImage } from 'app/contracts/file/list_productImage';
import { firstValueFrom, Observable } from 'rxjs';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private httpClientService:HttpClientService) { }

  async listByShowcaseProductImage():Promise<ListObject>{
    const observable:Observable<ListObject>=this.httpClientService.get({
      controller:"productImages",
      action:"listByShowcase",
    })
    return await firstValueFrom(observable) as ListObject;
  }

  async listProductImages(productId:string){
    const observable:Observable<ListObject>=this.httpClientService.get({
      controller:"productImages",
      action:"listProductImages"
      //queryString:`productId=${productId}`
    },productId)
    return await firstValueFrom(observable) as ListObject;
  }
}
