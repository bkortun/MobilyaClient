import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { RouterModule } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    OrderComponent
  ],
  imports: [
    CommonModule,
    MatExpansionModule,
    RouterModule.forChild([{path:"",component:OrderComponent}]),
    MatSidenavModule,
    MatButtonModule
  ]
})
export class OrderModule { }
