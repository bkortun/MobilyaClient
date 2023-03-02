import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ListProductImage } from 'app/contracts/file/list_productImage';
import { FileDeployOptions } from 'app/contracts/file/options/fileDeployOptions';
import { FileUploadOptions } from 'app/contracts/file/options/fileUploadOptions';
import { SetShowcaseImage } from 'app/contracts/file/setShowcase_image';
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
  @Output() dataEmitter:EventEmitter<FormData>=new EventEmitter();

  images:ListProductImage[]=[]
  baseUrl:BaseStorageUrl
  formData:FormData=new FormData()
  isChecked:boolean

  async ngOnInit() {
    await this.getImages()
  }

  async changeShowcase(imageId:string){
    let setShowcaseImage:SetShowcaseImage= new SetShowcaseImage();
    setShowcaseImage.imageId=imageId;
    setShowcaseImage.showcase=this.isChecked;
    this.fileControlService.setShowcase(setShowcaseImage);
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
    this.fileControlService.deleteFile(id);
  }

  getFileData(obj: FormData) {
    this.formData = obj
    this.dataEmitter.emit(this.formData)
  }
}


