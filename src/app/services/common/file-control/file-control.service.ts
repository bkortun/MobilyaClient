import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListObject } from 'app/contracts/common/list_object';
import { FileDeleteOptions } from 'app/contracts/file/options/fileDeleteOptions';
import { FileDeployOptions } from 'app/contracts/file/options/fileDeployOptions';
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

  async deleteFile(id,options:Partial<FileDeleteOptions>){
    const observable=this.httpClientService.delete({
      controller:options.controller,
      action:options.action
    },id)

    const result=await firstValueFrom(observable)
  }
}
