import { Component, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Campaign } from 'app/contracts/campaign/campaign';
import { FileDeployOptions } from 'app/contracts/file/options/fileDeployOptions';
import { FileUploadOptions } from 'app/contracts/file/options/fileUploadOptions';
import { FileUploadService } from 'app/services/common/file-upload/file-upload.service';
import { CampaignService } from 'app/services/common/modals/campaign.service';

@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.css']
})
export class UpdateDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public updateData: any, public dialogRef: MatDialogRef<UpdateDialogComponent>,
    private formBuilder: FormBuilder, private campaignService: CampaignService, private fileUploadService: FileUploadService) { }

  @Output() fileUploadOptions: Partial<FileUploadOptions> = {
    accept: ".jpg,.png,.jpeg",
    explanation: "Resim Ekle...",
    action: "uploadCampaignImage",
    controller: "campaigns",
    isAdminPage: true,
    isController: true,
  }

  @Output() fileDeployOptions: Partial<FileDeployOptions> = {
    action: "ListCampaignImage",
    controller: "campaigns",
    queryString: `campaignId=${this.updateData.id}`,
    id: this.updateData.id
  }

  //Todo sil tuşuna bastığında image ile beraber kampanya'da siliniyor
  formData: FormData = new FormData();

  campaignForm: FormGroup

  ngOnInit(): void {
    this.campaignForm = this.formBuilder.group({
      name: ["", Validators.required],
      description: ["", Validators.required]
    })
    if (this.updateData) {
      this.campaignForm.controls["name"].setValue(this.updateData.name);
      this.campaignForm.controls["description"].setValue(this.updateData.description);
    }
  }

  async updateCampaign() {
    if (this.campaignForm.valid) {
      let imageId=await this.uploadImage()
      const campaign: Campaign = new Campaign();
      campaign.id = this.updateData.id;
      campaign.name = this.campaignForm.controls["name"].value;
      campaign.description = this.campaignForm.controls["description"].value;
      campaign.imageId=imageId;
      campaign.createdDate = this.updateData.createdDate;
      campaign.updatedDate = null;
      campaign.status = this.updateData.status;
      console.log(campaign)
      await this.campaignService.update(campaign)
    }
    this.campaignForm.reset();
    //When save button on clicked, dialog will close
    this.dialogRef.close();
  }

  async uploadImage():Promise<string> {
    if (this.formData) {
      let uploadedImage=await this.fileUploadService.uploadFile(this.formData, {
        action: "UploadCampaignImage",
        controller: "campaigns",
      });
      return uploadedImage["id"];
    }
    return null;  }

  getFileData(obj: FormData) {
    this.formData = obj
  }
}
