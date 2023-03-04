import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FileUploadOptions } from 'app/contracts/file/options/fileUploadOptions';
import { UploadImage } from 'app/contracts/file/upload_image';
import { firstValueFrom, Observable } from 'rxjs';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private httpClientService: HttpClientService) { }

  async uploadFile(fileData:FormData,options:Partial<FileUploadOptions>){
    const observable=this.httpClientService.post({
      controller: options.controller,
      action: options.action,
      queryString: options.queryString,
      headers: new HttpHeaders({ "responseType": "blob" })
    }, fileData)

    const uploadedImage = await firstValueFrom(observable);
    return uploadedImage
  }
}
