import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { FileUploadOptions } from '../file-upload/file-upload.component';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class FileControlService {

  constructor(private httpClientService: HttpClientService) { }

  async getFiles(options:Partial<FileUploadOptions>){
    const observable=this.httpClientService.get({
      controller: options.controller,
      action: options.action,
      queryString: options.queryString,
      headers: new HttpHeaders({ "responseType": "blob" }
      )
    })

    const images = await firstValueFrom(observable);
    return images
  }
}
