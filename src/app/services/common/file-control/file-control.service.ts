import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListObject } from 'app/contracts/common/list_object';
import { FileDeployOptions } from 'app/contracts/file/options/fileDeployOptions';
import { SetShowcaseImage } from 'app/contracts/file/setShowcase_image';
import { firstValueFrom } from 'rxjs';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class FileControlService {

  constructor(private httpClientService: HttpClientService) { }

  async getFiles(id,options:Partial<FileDeployOptions>){
    const observable=this.httpClientService.get({
      controller: options.controller,
      action: options.action,
      //queryString: options.queryString,
      headers: new HttpHeaders({ "responseType": "blob" }
      )
    },id)

    const images = await firstValueFrom(observable) as ListObject;
    return images
  }

  async deleteFile(id:string){
    const observable=this.httpClientService.delete({
      controller:"files",
      action:"delete"
    },id)

    const result=await firstValueFrom(observable)
  }

  async setShowcase(body:SetShowcaseImage){
    const observable=this.httpClientService.put({
      controller:"images",
      action:"setShowcase"
    },body)
    const result=await firstValueFrom(observable)
  }
}
