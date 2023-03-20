import { Injectable } from '@angular/core';
import { CreateAddress } from 'app/contracts/address/create_address';
import { firstValueFrom, Observable } from 'rxjs';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private httpClientService: HttpClientService) { }

  async createAddress(address:CreateAddress): Promise<CreateAddress> {
    const obsevable: Observable<CreateAddress> = this.httpClientService.post({ controller: "Addresses" }, address)
    let addedAddress:CreateAddress=await firstValueFrom(obsevable) as CreateAddress;
    return addedAddress;
  }
}
