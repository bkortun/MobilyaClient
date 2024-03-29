import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { RouterModule } from '@angular/router';
import { InfiniteScrollModule } from "ngx-infinite-scroll";




@NgModule({
  declarations: [
    ProductsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path:"",component:ProductsComponent}]),
    RouterModule.forChild([{path:":categoryId",component:ProductsComponent}]),
    InfiniteScrollModule
  ]
})
export class ProductsModule { }
