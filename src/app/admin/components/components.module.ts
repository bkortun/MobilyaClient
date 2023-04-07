import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { CampaignModule } from 'app/ui/components/campaign/campaign.module';
import { OrderModule } from './order/order.module';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ProductsModule,
    CategoryModule,
    AuthModule,
    CampaignModule,
    OrderModule
  ]
})
export class ComponentsModule { }
