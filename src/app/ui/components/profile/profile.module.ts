import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'app/services/common/file-upload/file-upload.module';
import { FileControlModule } from 'app/services/common/file-control/file-control.module';
import { AddressDialogComponent } from './dialogs/address-dialog/address-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [
    ProfileComponent,
    AddressDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path:"profile/:userId",component:ProfileComponent}]),
    ReactiveFormsModule,
    FormsModule,
    FileUploadModule,
    FileControlModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
  ]
})
export class ProfileModule { }
