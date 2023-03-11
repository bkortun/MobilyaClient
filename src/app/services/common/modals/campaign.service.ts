import { Injectable } from '@angular/core';
import { Campaign } from 'app/contracts/campaign/campaign';
import { CreateCampaign } from 'app/contracts/campaign/create_campaign';
import { DeleteCampaign } from 'app/contracts/campaign/delete_campaign';
import { UpdateCampaign } from 'app/contracts/campaign/update_campaign';
import { ListObject } from 'app/contracts/common/list_object';
import { firstValueFrom, Observable } from 'rxjs';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  constructor(private httpClientService:HttpClientService) { }

  async create(campaign:CreateCampaign):Promise<CreateCampaign>{
    const observable:Observable<any|CreateCampaign>= this.httpClientService.post<CreateCampaign>({
      controller:"campaigns",
    },campaign)
    const addedCampaign:CreateCampaign= await firstValueFrom(observable) as CreateCampaign;
    //successCallBack();
    //errorCallBack(this.errorMessage);
    return addedCampaign;
  }

  async list(page:number=0, size:number=5):Promise<ListObject>{
    const observable:Observable<ListObject>=this.httpClientService.get({
      controller:"campaigns",
      queryString:`page=${page}&pageSize=${size}`
    })
    return await firstValueFrom(observable) as ListObject;
  }

  async update(campaign:UpdateCampaign):Promise<UpdateCampaign>{
    const observable:Observable<any|UpdateCampaign>= this.httpClientService.put<UpdateCampaign>({
      controller:"campaigns",
    },campaign)
    const updatedCampaign:UpdateCampaign= await firstValueFrom(observable) as UpdateCampaign;
    //successCallBack();
    //errorCallBack(this.errorMessage);
    return updatedCampaign;
  }

  async delete(id:string):Promise<DeleteCampaign>{
    const observable:Observable<any|DeleteCampaign>= this.httpClientService.delete({
      controller:"campaigns",
    },id);
    const deletedCampaign:DeleteCampaign= await firstValueFrom(observable) as DeleteCampaign;
    //successCallBack();
    //errorCallBack(this.errorMessage);
    return deletedCampaign;
  }

  async listById(id:string):Promise<Campaign>{
    const observable:Observable<Campaign>=this.httpClientService.get({
      controller:"campaigns",
    },id)
    return await firstValueFrom(observable) as Campaign;
  }
}
