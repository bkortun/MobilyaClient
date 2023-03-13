import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CreateCampaign } from 'app/contracts/campaign/create_campaign';
import { FileUploadOptions } from 'app/contracts/file/options/fileUploadOptions';
import { FileUploadService } from 'app/services/common/file-upload/file-upload.service';
import { CampaignService } from 'app/services/common/modals/campaign.service';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddDialogComponent>,
    private formBuilder: FormBuilder,
    private campaignService: CampaignService,
    private fileUploadService: FileUploadService
  ) { }

  @Output() fileUploadOptions: Partial<FileUploadOptions> = {
    accept: ".jpg,.png,.jpeg",
    explanation: "Resim Ekle...",
  }

  campaignForm: FormGroup;
  formData: FormData = new FormData();


  ngOnInit(): void {
    this.campaignForm = this.formBuilder.group({
      name: ["", Validators.required],
      description:["",Validators.required]
    })
  }

  async addCampaign() {
    const imageId=await this.uploadImage();
    if (this.campaignForm.valid){
      let createCampaign:CreateCampaign=new CreateCampaign();
      createCampaign.name=this.campaignForm.value["name"]
      createCampaign.description=this.campaignForm.value["description"]
      createCampaign.imageId=imageId
      console.log(createCampaign)
      await this.campaignService.create(createCampaign)
    }
    this.campaignForm.reset();
    //When save button on clicked, dialog will close
    this.dialogRef.close();
  }

  async uploadImage():Promise<string>{
      if (this.formData) {
       let uploadedImage=await this.fileUploadService.uploadFile(this.formData, {
          action: "UploadCampaignImage",
          controller: "campaigns",
        });
        return uploadedImage["id"];
      }
      return null;
  }

  getFileData(obj: FormData) {
    this.formData = obj
  }
}
