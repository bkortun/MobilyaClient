import { Injectable } from '@angular/core';
import { ListObject } from 'app/contracts/common/list_object';
import { AddedOperationClaimUser } from 'app/contracts/user/add_operationClamToUser';
import { RemovedOperationClaimUser } from 'app/contracts/user/remove_operationClaimFromUser';
import { firstValueFrom, Observable } from 'rxjs';
import { HttpClientService } from '../common/http-client.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClientService:HttpClientService) { }

  async listOperationClaim():Promise<ListObject>{
    const page=0
    const size=10
    const observable:Observable<ListObject>=this.httpClientService.get({
      controller:"auth",
      action:"listOperationClaim",
      queryString:`page=${page}&pageSize=${size}`
    })
    return await firstValueFrom(observable) as ListObject
  }

   async listOperationClaimByUserEmail(email:string):Promise<ListObject>{
     const observable:Observable<ListObject>=this.httpClientService.get({
      controller:"auth",
      action:"ListOperationClaimByUserEmail",
      queryString:"Email="+email
     })
     return await firstValueFrom(observable) as ListObject
   }

   async addOperationClaimToUser(userInfo:AddedOperationClaimUser,callBackFunction?:()=>void):Promise<AddedOperationClaimUser>{
    const observable:Observable<AddedOperationClaimUser>=this.httpClientService.post({
      controller:"auth",
      action:"AddOperationClaimToUser"
    },userInfo)
    const addedClaim=await firstValueFrom(observable) as AddedOperationClaimUser
    callBackFunction();
    return addedClaim
   }

   async removeOperationClaimFromUser(id:string,callBackFunction?:()=>void):Promise<RemovedOperationClaimUser>{
    const observable:Observable<RemovedOperationClaimUser>=this.httpClientService.delete({
      controller:"auth",
      action:"RemoveOperationClaimFromUser"
    },id)
    const removedClaim=await firstValueFrom(observable) as RemovedOperationClaimUser
    callBackFunction();
    return removedClaim
   }
}
