import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignComponent } from './campaign.component';
import { RouterModule } from '@angular/router';
import { ControlComponent } from './control/control.component';
import { AddDialogComponent } from './control/dialogs/add-dialog/add-dialog.component';
import { DeleteDialogComponent } from './control/dialogs/delete-dialog/delete-dialog.component';
import { UpdateDialogComponent } from './control/dialogs/update-dialog/update-dialog.component';
import { ListComponent } from './list/list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { FileControlModule } from 'app/services/common/file-control/file-control.module';
import { FileUploadModule } from 'app/services/common/file-upload/file-upload.module';



@NgModule({
  declarations: [
    CampaignComponent,
    ControlComponent,
    AddDialogComponent,
    DeleteDialogComponent,
    UpdateDialogComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path:"",component:CampaignComponent}]),
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
export class CampaignModule { }
