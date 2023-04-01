import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserAddress } from 'app/contracts/address/user_address';
import { AddressService } from 'app/services/common/modals/address.service';
import { AuthService } from 'app/services/common/modals/auth.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  constructor(private authService:AuthService,private addressService:AddressService
    ,private activatedRoute:ActivatedRoute) { }

  userId:string;
  userAddresses:UserAddress[];
  selectedAddress:UserAddress;

  ngOnInit(): void {
    this.userId=this.getUserId();
    this.getAddresses();
  }

  getUserId(){
    return this.authService.decodeToken().nameIdentifier;
  }

  async getAddresses() {
    const list = await this.addressService.getAddresses(this.activatedRoute.snapshot.paramMap.get("userId"));
    console.log(list.items)
    this.userAddresses =list.items;
  }

  getAddressId(id: string) {
    this.userAddresses.forEach(userAddress => {
      if (userAddress.addressId == id)
        this.selectedAddress = userAddress;
    });
    console.log(this.selectedAddress)
  }

}
