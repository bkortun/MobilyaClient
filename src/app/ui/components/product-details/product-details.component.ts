import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent, SpinnerType } from 'app/base/base.component';
import { CreateBasketItem } from 'app/contracts/basketItem/create_basketItem';
import { ListProductImage } from 'app/contracts/file/list_productImage';
import { Product } from 'app/contracts/product/product';
import { BaseStorageUrl } from 'app/contracts/setting/baseStorageUrl';
import { AuthService } from 'app/services/common/modals/auth.service';
import { BasketService } from 'app/services/common/modals/basket.service';
import { ImageService } from 'app/services/common/modals/image.service';
import { ProductService } from 'app/services/common/modals/product.service';
import { SettingService } from 'app/services/common/modals/setting.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'app/services/ui/custom-toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent extends BaseComponent implements OnInit {

  constructor(private activeRoute:ActivatedRoute, private productService:ProductService,
     private imageService:ImageService,private settingService:SettingService,
     private authService:AuthService,private basketService:BasketService,private router:Router,
     private toastrService:CustomToastrService, spinner:NgxSpinnerService) {
      super(spinner)
      this.showSpinner(SpinnerType.BallClimbingDot)
     }

  product:Product
  images:ListProductImage[]
  baseUrl:BaseStorageUrl
  selectedQuantity:number
  userId:string;

  ngOnInit(): void {
    this.selectedQuantity=1
    let productId=this.activeRoute.snapshot.paramMap.get("productId");
    this.getProduct(productId);
    console.log(this.selectedQuantity)
    this.hideSpinner(SpinnerType.BallClimbingDot)
  }

  async getProduct(id:string){
    this.baseUrl=await this.settingService.getBaseStorageUrl();
    this.product= await this.productService.listById(id);
    this.images=await (await this.imageService.listProductImages(id)).items;
    this.images[0].isFirst=true
  }

  isContainsWithoutNull(array){
    return array?.some(el=>el!==null)
  }


  increaseQuantity(){
    if(this.selectedQuantity<this.product.stock)
      this.selectedQuantity=this.selectedQuantity+1
  }
  decreaseQuantity(){
    if(this.selectedQuantity>1)
      this.selectedQuantity=this.selectedQuantity-1
  }

  async addToBasket(productId: string) {
    try {
    this.showSpinner(SpinnerType.BallClimbingDot)
    this.userId = this.authService.decodeToken().nameIdentifier;
    let basketId = await (await this.basketService.listBasket(this.userId)).id;
    let basketItem: CreateBasketItem = new CreateBasketItem();
    basketItem.basketId = basketId;
    basketItem.productId = productId;
    basketItem.quantity = this.selectedQuantity;
    this.basketService.createBasketItem(basketItem,()=>{
      this.toastrService.message("Ürün sepete eklendi.",
      "Bilgilendirme",{messageType:ToastrMessageType.Success,position:ToastrPosition.BottomRight})
      this.showSpinner(SpinnerType.BallClimbingDot)
    });
    } catch (error) {
      this.router.navigateByUrl("/login")
      this.toastrService.message("Sepete ürün eklemek için öncelikle giriş yapmalısınız.",
      "Uyarı",{messageType:ToastrMessageType.Warning,position:ToastrPosition.BottomRight})
      this.hideSpinner(SpinnerType.BallClimbingDot)
    }
  }
  async goToBasket(productId: string){
    this.showSpinner(SpinnerType.BallClimbingDot)
    await this.addToBasket(productId);
    if(this.authService.decodeToken().nameIdentifier)
      this.router.navigateByUrl(`/basket/${this.userId}`)
    this.hideSpinner(SpinnerType.BallClimbingDot)
  }
}
