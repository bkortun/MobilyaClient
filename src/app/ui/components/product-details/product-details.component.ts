import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateBasketItem } from 'app/contracts/basketItem/create_basketItem';
import { ListProductImage } from 'app/contracts/file/list_productImage';
import { Product } from 'app/contracts/product/product';
import { BaseStorageUrl } from 'app/contracts/setting/baseStorageUrl';
import { AuthService } from 'app/services/common/modals/auth.service';
import { BasketService } from 'app/services/common/modals/basket.service';
import { ImageService } from 'app/services/common/modals/image.service';
import { ProductService } from 'app/services/common/modals/product.service';
import { SettingService } from 'app/services/common/modals/setting.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  constructor(private activeRoute:ActivatedRoute, private productService:ProductService,
     private imageService:ImageService,private settingService:SettingService,
     private authService:AuthService,private basketService:BasketService,private router:Router) { }

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

  //Todo bugfix
  increaseQuantity(){
    if(this.selectedQuantity<this.product.stock)
      this.selectedQuantity=this.selectedQuantity+1
    console.log(this.selectedQuantity)

  }
  decreaseQuantity(){
    if(this.selectedQuantity>0)
      this.selectedQuantity=this.selectedQuantity-1
    console.log(this.selectedQuantity)
  }

  async addToBasket(productId: string) {
    try {
    this.userId = this.authService.decodeToken().nameIdentifier;
    let basketId = await (await this.basketService.listBasket(this.userId)).id;
    let basketItem: CreateBasketItem = new CreateBasketItem();
    basketItem.basketId = basketId;
    basketItem.productId = productId;
    basketItem.quantity = this.selectedQuantity;
    this.basketService.createBasketItem(basketItem);
    } catch (error) {
      this.router.navigateByUrl("/login")
    }
  }
  async goToBasket(productId: string){
    await this.addToBasket(productId);
    if(this.authService.decodeToken().nameIdentifier)
      this.router.navigateByUrl(`/basket/${this.userId}`)
  }
}
