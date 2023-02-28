import { HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  @Input() options:Partial<FileUploadOptions>;
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

      if(this.options.isController){
        this.fileUploadService.uploadFile(fileData, {
          action: this.options.action,
          controller: this.options.controller,
          queryString: this.options.queryString
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

export class FileUploadOptions{
  controller?: string
  action?: string
  queryString?: string
  explanation?: string
  accept?: string
  isAdminPage?: boolean = true
  isController?:boolean
}
