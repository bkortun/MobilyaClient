import { Component, Input, OnInit } from '@angular/core';
import { FileUploadOptions } from '../file-upload/file-upload.component';
import { FileControlService } from './file-control.service';

@Component({
  selector: 'app-file-control',
  templateUrl: './file-control.component.html',
  styleUrls: ['./file-control.component.css']
})
export class FileControlComponent implements OnInit{

  constructor(private fileControlService:FileControlService) { }

  @Input() options:Partial<FileUploadOptions>

  ngOnInit(): void {
    this.getImages()
  }


  getImages(){
    this.fileControlService.getFiles(this.options)
  }


}


