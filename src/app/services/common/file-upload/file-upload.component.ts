import { HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FileUploadOptions } from 'app/contracts/file/options/fileUploadOptions';
import { AlertifyService } from 'app/services/admin/alertify.service';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { firstValueFrom } from 'rxjs';
import { HttpClientService } from '../http-client.service';
import { SettingService } from '../modals/setting.service';
import { FileUploadService } from './file-upload.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {

  constructor(private fileUploadService:FileUploadService) { }

  public files: NgxFileDropEntry[];

  @Input() fileUploadOptions:Partial<FileUploadOptions>;
  @Output() dataEmitter:EventEmitter<FormData>=new EventEmitter();

  public async selectFiles(files: NgxFileDropEntry[]) {

    this.files = files;
    const fileData:FormData=new FormData();

    for (const selectedFile of files) {

      if (selectedFile.fileEntry.isFile) {
        const fileEntry = selectedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          fileData.append(file.name,file,selectedFile.relativePath)
        });
      } else {
        const fileEntry = selectedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(selectedFile.relativePath, fileEntry);
      }
      this.dataEmitter.emit(fileData)

      if(this.fileUploadOptions.isController){
        this.fileUploadService.uploadFile(fileData, {
          action: this.fileUploadOptions.action,
          controller: this.fileUploadOptions.controller,
          queryString: this.fileUploadOptions.queryString
        })
      }
    }

  }

  public fileOver(event){
    console.log(event);
  }

  public fileLeave(event){
    console.log(event);
  }

}


