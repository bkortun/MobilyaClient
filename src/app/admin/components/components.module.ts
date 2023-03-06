import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ProductsModule,
    CategoryModule,
    AuthModule
  ]
})
export class ComponentsModule { }
