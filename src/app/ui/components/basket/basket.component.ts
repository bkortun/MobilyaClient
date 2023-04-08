import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent, SpinnerType } from 'app/base/base.component';
import { UserAddress } from 'app/contracts/address/user_address';
import { ListBasket } from 'app/contracts/basket/list_basket';
import { ListBasketItem } from 'app/contracts/basketItem/list_basketItem';
import { CreateOrder } from 'app/contracts/order/create_order';
import { AddressService } from 'app/services/common/modals/address.service';
import { AuthService } from 'app/services/common/modals/auth.service';
import { BasketService } from 'app/services/common/modals/basket.service';
import { OrderService } from 'app/services/common/modals/order.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'app/services/ui/custom-toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent extends BaseComponent implements OnInit {

  constructor(private authService:AuthService,private addressService:AddressService,
    private activatedRoute:ActivatedRoute, private basketService:BasketService,
    private orderService:OrderService, private router:Router,private toastrService:CustomToastrService,
    spinner:NgxSpinnerService) {
      super(spinner)
      this.showSpinner(SpinnerType.BallClimbingDot)
    }

    @ViewChild('quantity') quantity:ElementRef;

  userId:string;
  userAddresses:UserAddress[];
  selectedAddress:UserAddress;
  basket:ListBasket;
  basketItems:ListBasketItem[];
  basketItemsCount:number;
  selectedQuantity:number

  ngOnInit(): void {
    this.userId=this.getUserId();
    this.getAddresses();
    this.getBasketOfUser();
    this.hideSpinner(SpinnerType.BallClimbingDot)
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
   this.getBasketItems(this.basket.id);
  }

  async getBasketItems(basketId:string){
    console.log(this.basket.id)
    const list=await this.basketService.listBasketItems(0,20,basketId);
    console.log(list)
    this.basketItems=list.items;
    this.basketItemsCount=list.count;
  }

  async increaseQuantity(basketItemId:string,quantity:number){
    this.showSpinner(SpinnerType.BallClimbingDot)
    this.quantity["value"]= await (await this.basketService.changeQuantity(basketItemId,quantity+1)).quantity.toString();
    window.location.reload();
    this.hideSpinner(SpinnerType.BallClimbingDot)
  }
  async decreaseQuantity(basketItemId:string,quantity:number){
    this.showSpinner(SpinnerType.BallClimbingDot)
    if(quantity>1)
      this.quantity["value"]= await (await this.basketService.changeQuantity(basketItemId,quantity-1)).quantity.toString();
    window.location.reload();
    this.hideSpinner(SpinnerType.BallClimbingDot)
  }

  async changeQuantity(basketItemId:string,quantity:string){
    this.showSpinner(SpinnerType.BallClimbingDot)
    console.log(quantity+" change")
    this.quantity["value"]= await (await this.basketService.changeQuantity(basketItemId,parseInt(quantity))).quantity.toString();
    window.location.reload();
    this.hideSpinner(SpinnerType.BallClimbingDot)
  }

  async deleteBasketItem(basketItemId:string){
    this.showSpinner(SpinnerType.BallClimbingDot)
    this.basketService.deleteBasketItem(basketItemId,()=>{
      this.toastrService.message("Ürün sepetten çıkartıldı.",
      "Bilgilendirme",{messageType:ToastrMessageType.Warning,position:ToastrPosition.BottomRight})
    });
    this.hideSpinner(SpinnerType.BallClimbingDot)

  }

  async closeBasket(){
    this.showSpinner(SpinnerType.BallClimbingDot)
    let body=new CreateOrder();
    body.basketId=this.basket.id;
    await this.orderService.create(body,()=>{
      this.toastrService.message("Siparişiniz başarıyla oluşturuldu.",
      "Bilgilendirme",{messageType:ToastrMessageType.Success,position:ToastrPosition.BottomRight})
    });
    this.router.navigateByUrl("/")
    this.hideSpinner(SpinnerType.BallClimbingDot)
  }
}
