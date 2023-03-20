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
    const obsevable: Observable<CreateAddress> = this.httpClientService.post({ controller: "Addresses" }, address)
    let addedAddress:CreateAddress=await firstValueFrom(obsevable) as CreateAddress;
    return addedAddress;
  }

  async getAddresses(userId:string): Promise<ListObject> {
    const obsevable: Observable<ListObject> = this.httpClientService.get({ controller: "UserDetailAddresses" }, userId)
    let userAddress:ListObject=await firstValueFrom(obsevable) as ListObject;
    return userAddress;
  }

  async delete(id:string){
    const obsevable= this.httpClientService.delete({ controller: "Addresses" }, id)
    let deletedAddress=await firstValueFrom(obsevable);
    return deletedAddress;
  }
}
