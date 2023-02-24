import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {MatTableModule} from '@angular/material/table';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';

import { ProductsComponent } from './products.component';
import { ControlComponent } from './control/control.component';
import { ListComponent } from './list/list.component';
import { AddDialogComponent } from './control/dialogs/add-dialog/add-dialog.component';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { UpdateDialogComponent } from './control/dialogs/update-dialog/update-dialog.component';
import { DeleteDialogComponent } from './control/dialogs/delete-dialog/delete-dialog.component';
import { FileUploadModule } from 'app/services/common/file-upload/file-upload.module';
import { FileControlModule } from 'app/services/common/file-control/file-control.module';

@NgModule({
  declarations: [
    ProductsComponent,
    ListComponent,
    ControlComponent,
    AddDialogComponent,
    UpdateDialogComponent,
    DeleteDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path:"",component:ProductsComponent}]),
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
    FileUploadModule,
    FileControlModule
  ]
})
export class ProductsModule { }
