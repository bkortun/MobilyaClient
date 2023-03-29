import { Component, OnInit } from '@angular/core';
import { Dynamic, Filter, Sort } from 'app/contracts/common/dynamic_query';
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

  constructor(private productService: ProductService, private imageService: ImageService, private settingService: SettingService) { }

  productImages: ProductImage[] = []
  baseUrl: BaseStorageUrl
  page = 0
  size = 36
  dynamicBody: Dynamic;
  isClicked:boolean=false

  ngOnInit(): void {
    this.getbaseUrl()
    this.combineProductImages(this.page, this.size);
  }

  async combineProductImages(page, size,isDynamic:boolean=false) {
    let listProduct: ListObject;
    if(!isDynamic)
      listProduct= await this.productService.list(page, size);
    else
      listProduct= await this.productService.listDynamic(this.dynamicBody,page, size);

    let products: Product[] = listProduct.items
    console.log(products)
    let list: ListObject = await this.imageService.listByShowcaseProductImage();
    let images: ListProductImage[] = new Array(list.count);
    images = list.items;

    for(let i=0; i<products.length;i++){
      let entity: ProductImage = new ProductImage();
      let img: ListProductImage[] = new Array(list.count);
      let isFirst = true
      entity.product = products[i];
      for(let j=0;j<images.length;j++){
        if (images[j].productId == products[i].id) {
          images[j].isFirst = isFirst
          img.push(images[j]);
          isFirst = false
        }
        else {
          img.push(null)
        }
      }
      entity.images = img
      this.productImages[i]=entity;
    }
  }

  isContainsWithoutNull(array) {
    return array.some(el => el !== null)
  }



  async getbaseUrl() {
    this.baseUrl = await this.settingService.getBaseStorageUrl()
  }

  onScroll() {
    console.log(this.page)
    this.page = this.page + 1
    this.combineProductImages(this.page, this.size)
  }


  //   async listProducts(){
  //     let listProduct:ListObject = await this.productService.list(0,36);
  //     this.products=listProduct.items
  //   }

  //  async listShowcaseImages(){
  //     let list:ListObject = await this.imageService.listByShowcaseProductImage();
  //     this.images=list.items;
  //   }

  sortClick(field:string,dir:string){
    this.dynamicBody=new Dynamic();
    let sorts:Sort[]=new Array();
    let sort:Sort=new Sort();
    let filter:Filter=new Filter();
    filter=null;
    sort.field=field;
    sort.dir=dir;
    sorts.push(sort);
    this.dynamicBody.sort=sorts;
    this.dynamicBody.filter=filter;
    this.combineProductImages(0,this.size,true);
  }

}
