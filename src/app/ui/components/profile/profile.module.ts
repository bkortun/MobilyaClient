import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'app/services/common/file-upload/file-upload.module';
import { FileControlModule } from 'app/services/common/file-control/file-control.module';



@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path:"profile/:userId",component:ProfileComponent}]),
    ReactiveFormsModule,
    FormsModule,
    FileUploadModule,
    FileControlModule
  ]
})
export class ProfileModule { }
