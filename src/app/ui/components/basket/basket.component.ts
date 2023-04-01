import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserAddress } from 'app/contracts/address/user_address';
import { ListBasket } from 'app/contracts/basket/list_basket';
import { AddressService } from 'app/services/common/modals/address.service';
import { AuthService } from 'app/services/common/modals/auth.service';
import { BasketService } from 'app/services/common/modals/basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  constructor(private authService:AuthService,private addressService:AddressService
    ,private activatedRoute:ActivatedRoute, private basketService:BasketService) { }

  userId:string;
  userAddresses:UserAddress[];
  selectedAddress:UserAddress;
  basket:ListBasket;

  ngOnInit(): void {
    this.userId=this.getUserId();
    this.getAddresses();
    this.getBasketOfUser();
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

  async getBasketOfUser(){
   this.basket =await this.basketService.listBasket(this.userId);
   console.log(this.basket)
  }

}
