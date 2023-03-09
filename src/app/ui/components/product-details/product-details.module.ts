import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailsComponent } from './product-details.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommentModule } from '../comment/comment.module';



@NgModule({
  declarations: [
    ProductDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path:"detail/:productId",component:ProductDetailsComponent}]),
    FormsModule,
    CommentModule
  ]
})
export class ProductDetailsModule { }
