import { Injectable } from '@angular/core';
import { BaseStorageUrl } from 'app/contracts/setting/baseStorageUrl';
import { firstValueFrom, Observable } from 'rxjs';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  constructor(private httpClientService:HttpClientService) { }

  async getBaseStorageUrl(page:number=0, size:number=5,successCallBack?:()=>void,errorCallBack?:(error)=>void):Promise<BaseStorageUrl>{
    const observable:Observable<BaseStorageUrl>=this.httpClientService.get({
      controller:"settings",
      action:"GetBaseStorageUrl"
    })
    return await firstValueFrom(observable) as BaseStorageUrl;
  }
}
