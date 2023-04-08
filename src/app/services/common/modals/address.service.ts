import { Injectable } from '@angular/core';
import { CreateAddress } from 'app/contracts/address/create_address';
import { UserAddress } from 'app/contracts/address/user_address';
import { ListObject } from 'app/contracts/common/list_object';
import { firstValueFrom, Observable } from 'rxjs';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private httpClientService: HttpClientService) { }

  async create(address:CreateAddress): Promise<CreateAddress> {
    const observable: Observable<CreateAddress> = this.httpClientService.post({ controller: "Addresses" }, address)
    let addedAddress:CreateAddress=await firstValueFrom(observable) as CreateAddress;
    return addedAddress;
  }

  async createUserDetailAddress(addressId:string,userId:string, callBackFunction?:()=>void) {
    const observable = this.httpClientService.post({ controller: "UserDetailAddresses" }, {addressId,userId})
    let addedAddress=await firstValueFrom(observable)
    callBackFunction();
    return addedAddress;
  }

  async getAddresses(userId:string): Promise<ListObject> {
    const observable: Observable<ListObject> = this.httpClientService.get({
      controller: "UserDetailAddresses",
      queryString:`userId=${userId}`
   })
    let userAddress:ListObject=await firstValueFrom(observable) as ListObject;
    return userAddress;
  }

  async delete(id:string, callBackFunction?:()=>void){
    const observable= this.httpClientService.delete({ controller: "Addresses" }, id)
    let deletedAddress=await firstValueFrom(observable);
    callBackFunction();
    return deletedAddress;
  }
}
