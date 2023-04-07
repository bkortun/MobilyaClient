import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { RouterModule } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { BasketItemsDialogComponent } from './basket-items-dialog/basket-items-dialog.component';



@NgModule({
  declarations: [
    OrderComponent,
    BasketItemsDialogComponent
  ],
  imports: [
    CommonModule,
    MatExpansionModule,
    RouterModule.forChild([{path:"",component:OrderComponent}]),
    MatSidenavModule,
    MatButtonModule,
    MatDialogModule,
  ]
})
export class OrderModule { }
