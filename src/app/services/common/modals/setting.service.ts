import { Injectable } from '@angular/core';
import { BaseStorageUrl } from 'app/contracts/setting/baseStorageUrl';
import { firstValueFrom, Observable } from 'rxjs';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  constructor(private httpClientService:HttpClientService) { }

  async getBaseStorageUrl():Promise<BaseStorageUrl>{
    const observable:Observable<BaseStorageUrl>=this.httpClientService.get({
      controller:"settings",
      action:"GetBaseStorageUrl"
    })
    return await firstValueFrom(observable) as BaseStorageUrl;
  }
}
