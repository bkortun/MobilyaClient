import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { RouterModule } from '@angular/router';
import {MatTableModule} from '@angular/material/table';



@NgModule({
  declarations: [
    ProductsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path:"",component:ProductsComponent}]),
    MatTableModule
  ]
})
export class ProductsModule { }
