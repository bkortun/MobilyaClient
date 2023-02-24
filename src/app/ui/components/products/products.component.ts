import { Component, OnInit } from '@angular/core';
import { ListObject } from 'app/contracts/common/list_object';
import { Product } from 'app/contracts/product/product';
import { ProductService } from 'app/services/common/modals/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private productService:ProductService) { }

  products:Product[]=[]

  ngOnInit(): void {
    this.listProducts()
  }


  async listProducts(){
    let listProduct:ListObject = await this.productService.list(0,36);
    this.products=listProduct.items
  }

}
