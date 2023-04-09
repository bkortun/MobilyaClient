import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ListProductImage } from 'app/contracts/file/list_productImage';
import { FileDeployOptions } from 'app/contracts/file/options/fileDeployOptions';
import { FileUploadOptions } from 'app/contracts/file/options/fileUploadOptions';
import { SetShowcaseImage } from 'app/contracts/file/setShowcase_image';
import { BaseStorageUrl } from 'app/contracts/setting/baseStorageUrl';
import { SettingService } from '../modals/setting.service';
import { FileControlService } from './file-control.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'app/services/ui/custom-toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'app/base/base.component';

declare var $:any

@Component({
  selector: 'app-file-control',
  templateUrl: './file-control.component.html',
  styleUrls: ['./file-control.component.css']
})
export class FileControlComponent extends BaseComponent implements OnInit{

  constructor(private fileControlService:FileControlService, private settingService:SettingService,
    private toastrService:CustomToastrService,spinner:NgxSpinnerService) {
      super(spinner)
     }

  @Input() fileUploadOptions:Partial<FileUploadOptions>
  @Input() fileDeployOptions:Partial<FileDeployOptions>
  @Output() dataEmitter:EventEmitter<FormData>=new EventEmitter();

  images?:ListProductImage[]=[]
  baseUrl:BaseStorageUrl
  formData:FormData=new FormData()

  async ngOnInit() {
    await this.getImages()
  }

  async changeShowcase(imageId:string,event:MatCheckboxChange){
    let body:SetShowcaseImage =new SetShowcaseImage();
    body.showcase= event.checked
    body.imageId=imageId
    await this.fileControlService.setShowcase(body);
  }

  async getImages(){
    this.getBaseStorageUrl()
    const response=await this.fileControlService.getFiles(this.fileDeployOptions.id,this.fileDeployOptions)
    if(response!=null)
      this.images=response.items
  }

  async getBaseStorageUrl(){
    this.baseUrl=await this.settingService.getBaseStorageUrl()
  }

  async deleteImage(id){
    this.showSpinner(SpinnerType.BallClimbingDot)
    this.fileControlService.deleteFile(id,()=>{
      this.toastrService.message("Resim silindi.",
      "Bilgilendirme",{messageType:ToastrMessageType.Info,position:ToastrPosition.BottomLeft})
      this.hideSpinner(SpinnerType.BallClimbingDot)
    });
  }

  getFileData(obj: FormData) {
    this.formData = obj
    this.dataEmitter.emit(this.formData)
  }
}


