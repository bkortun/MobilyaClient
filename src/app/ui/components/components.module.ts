import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterModule } from './register/register.module';
import { ProductsModule } from './products/products.module';
import { HomeModule } from './home/home.module';
import { LoginModule } from './login/login.module';
import { ProfileModule } from './profile/profile.module';
import { ContactModule } from './contact/contact.module';
import { AboutModule } from './about/about.module';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RegisterModule,
    HomeModule,
    ProductsModule,
    LoginModule,
    ProfileModule,
    ContactModule,
    AboutModule
  ]
})
export class ComponentsModule { }
