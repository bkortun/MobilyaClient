import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category.component';
import { ListComponent } from './list/list.component';
import { ControlComponent } from './control/control.component';
import { AddDialogComponent } from './control/dialogs/add-dialog/add-dialog.component';
import { DeleteDialogComponent } from './control/dialogs/delete-dialog/delete-dialog.component';
import { UpdateDialogComponent } from './control/dialogs/update-dialog/update-dialog.component';
import { RouterModule } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTableModule} from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    CategoryComponent,
    ListComponent,
    ControlComponent,
    AddDialogComponent,
    DeleteDialogComponent,
    UpdateDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path:"",component:CategoryComponent}]),
    MatSidenavModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    MatSortModule,
  ]
})
export class CategoryModule { }
