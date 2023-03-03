import { Component, OnInit } from '@angular/core';
import { ListObject } from 'app/contracts/common/list_object';
import { ListProductImage } from 'app/contracts/file/list_productImage';
import { Product } from 'app/contracts/product/product';
import { ImageService } from 'app/services/common/modals/image.service';
import { ProductService } from 'app/services/common/modals/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private productService:ProductService,private imageService:ImageService) { }

  products:Product[]=[]
  images:ListProductImage[]=[]

  ngOnInit(): void {
    this.listProducts();
    //this.listShowcaseImages();
  }


  async listProducts(){
    let listProduct:ListObject = await this.productService.list(0,36);
    this.products=listProduct.items
  }

 /* async listShowcaseImages(){
    let list:ListObject = await this.imageService.listByShowcaseProductImage();
    this.images=list.items;
  }*/

}
