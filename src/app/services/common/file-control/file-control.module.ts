import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileControlComponent } from './file-control.component';
import { FileUploadModule } from '../file-upload/file-upload.module';
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    FileControlComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    FileUploadModule,
    MatButtonModule,
    MatCheckboxModule,
    FormsModule
  ],
  exports:[
    FileControlComponent
  ]
})
export class FileControlModule { }
