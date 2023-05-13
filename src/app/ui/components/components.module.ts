import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterModule } from './register/register.module';
import { ProductsModule } from './products/products.module';
import { HomeModule } from './home/home.module';
import { LoginModule } from './login/login.module';
import { ProfileModule } from './profile/profile.module';
import { ContactModule } from './contact/contact.module';
import { AboutModule } from './about/about.module';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductDetailsModule } from './product-details/product-details.module';
import { CampaignModule } from './campaign/campaign.module';
import { FormsModule } from '@angular/forms';
import { BasketModule } from './basket/basket.module';
import { OrderModule } from './order/order.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RegisterModule,
    HomeModule,
    ProductsModule,
    ProductDetailsModule,
    CampaignModule,
    LoginModule,
    ProfileModule,
    ContactModule,
    AboutModule,
    BasketModule,
    OrderModule
  ]
})
export class ComponentsModule { }
