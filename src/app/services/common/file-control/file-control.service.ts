import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListObject } from 'app/contracts/common/list_object';
import { firstValueFrom } from 'rxjs';
import { FileUploadOptions } from '../file-upload/file-upload.component';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class FileControlService {

  constructor(private httpClientService: HttpClientService) { }

  async getFiles(id,options:Partial<FileUploadOptions>){
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
}
