import { Component, OnInit } from '@angular/core';
import { ListObject } from 'app/contracts/common/list_object';
import { ListProductImage } from 'app/contracts/file/list_productImage';
import { Product } from 'app/contracts/product/product';
import { ProductImage } from 'app/contracts/product/productImage';
import { BaseStorageUrl } from 'app/contracts/setting/baseStorageUrl';
import { ImageService } from 'app/services/common/modals/image.service';
import { ProductService } from 'app/services/common/modals/product.service';
import { SettingService } from 'app/services/common/modals/setting.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private productService:ProductService,private imageService:ImageService,private settingService:SettingService) { }

  productImages:ProductImage[]=[]
  baseUrl:BaseStorageUrl
  page=0
  size=36

  ngOnInit(): void {
    this.getbaseUrl()
    this.combineProductImages(this.page,this.size);
  }

  async combineProductImages(page,size){
    let listProduct:ListObject = await this.productService.list(page,size);
    let products:Product[]=listProduct.items

    let list:ListObject = await this.imageService.listByShowcaseProductImage();
    let images:ListProductImage[]=new Array(list.count);
    images=list.items;

    products.forEach(product => {
      let entity:ProductImage=new ProductImage();
      let img:ListProductImage[]=new Array(list.count);
      let isFirst=true
      entity.product=product;
      images.forEach(image => {
        if(image.productId==product.id){
          image.isFirst=isFirst
          img.push(image);
          isFirst=false
        }
        else{
          img.push(null)
        }

      });
      entity.images=img
      this.productImages.push(entity);
    });

  }

  isContainsWithoutNull(array){
    return array.some(el=>el!==null)
  }



  async getbaseUrl(){
   this.baseUrl = await this.settingService.getBaseStorageUrl()
  }

  onScroll(){
    console.log(this.page)
    this.page=this.page+1
    this.combineProductImages(this.page,this.size)
  }


//   async listProducts(){
//     let listProduct:ListObject = await this.productService.list(0,36);
//     this.products=listProduct.items
//   }

//  async listShowcaseImages(){
//     let list:ListObject = await this.imageService.listByShowcaseProductImage();
//     this.images=list.items;
//   }

}
