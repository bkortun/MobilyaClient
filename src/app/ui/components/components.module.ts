import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterModule } from './register/register.module';
import { ProductsModule } from './products/products.module';
import { HomeModule } from './home/home.module';
import { LoginModule } from './login/login.module';
import { ProfileModule } from './profile/profile.module';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RegisterModule,
    HomeModule,
    ProductsModule,
    LoginModule,
    ProfileModule
  ]
})
export class ComponentsModule { }
