import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileControlComponent } from './file-control.component';
import { FileUploadModule } from '../file-upload/file-upload.module';
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';




@NgModule({
  declarations: [
    FileControlComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    FileUploadModule,
    MatButtonModule
  ],
  exports:[
    FileControlComponent
  ]
})
export class FileControlModule { }
