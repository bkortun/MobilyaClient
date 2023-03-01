import { Component, Input, OnInit } from '@angular/core';
import { ListProductImage } from 'app/contracts/file/list_productImage';
import { FileDeleteOptions } from 'app/contracts/file/options/fileDeleteOptions';
import { FileDeployOptions } from 'app/contracts/file/options/fileDeployOptions';
import { FileUploadOptions } from 'app/contracts/file/options/fileUploadOptions';
import { BaseStorageUrl } from 'app/contracts/setting/baseStorageUrl';
import { SettingService } from '../modals/setting.service';
import { FileControlService } from './file-control.service';

declare var $:any

@Component({
  selector: 'app-file-control',
  templateUrl: './file-control.component.html',
  styleUrls: ['./file-control.component.css']
})
export class FileControlComponent implements OnInit{

  constructor(private fileControlService:FileControlService, private settingService:SettingService) { }

  @Input() fileUploadOptions:Partial<FileUploadOptions>
  @Input() fileDeployOptions:Partial<FileDeployOptions>
  @Input() fileDeleteOptions:Partial<FileDeleteOptions>

  images:ListProductImage[]=[]
  baseUrl:BaseStorageUrl

  async ngOnInit() {
    await this.getImages()
  }


  async getImages(){
    this.getBaseStorageUrl()
    const response=await this.fileControlService.getFiles(this.fileDeployOptions.id,this.fileDeployOptions)
    this.images=response.items
  }

  async getBaseStorageUrl(){
    this.baseUrl=await this.settingService.getBaseStorageUrl()
  }

  async deleteImage(id){
    this.fileControlService.deleteFile(id,this.fileDeleteOptions);
  }


}


