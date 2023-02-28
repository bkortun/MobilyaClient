import { Component, Input, OnInit } from '@angular/core';
import { ListProductImage } from 'app/contracts/file/list_productImage';
import { BaseStorageUrl } from 'app/contracts/setting/baseStorageUrl';
import { FileUploadOptions } from '../file-upload/file-upload.component';
import { SettingService } from '../modals/setting.service';
import { FileControlService } from './file-control.service';

@Component({
  selector: 'app-file-control',
  templateUrl: './file-control.component.html',
  styleUrls: ['./file-control.component.css']
})
export class FileControlComponent implements OnInit{

  constructor(private fileControlService:FileControlService, private settingService:SettingService) { }

  @Input() options:Partial<FileUploadOptions>
  @Input() getOptions:Partial<FileUploadOptions>

  images:ListProductImage[]=[]
  baseUrl:BaseStorageUrl

  async ngOnInit() {
    await this.getImages()
  }


  async getImages(){
    const response=await this.fileControlService.getFiles(this.getOptions.explanation,this.getOptions)
    this.images=response.items
    this.getBaseStorageUrl()
  }

  async getBaseStorageUrl(){
    this.baseUrl=await this.settingService.getBaseStorageUrl()
  }


}


