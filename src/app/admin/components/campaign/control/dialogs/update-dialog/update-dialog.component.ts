import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Campaign } from 'app/contracts/campaign/campaign';
import { CampaignService } from 'app/services/common/modals/campaign.service';

@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.css']
})
export class UpdateDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public updateData:any, public dialogRef: MatDialogRef<UpdateDialogComponent>,
  private formBuilder:FormBuilder,private campaignService:CampaignService) { }

  campaignForm:FormGroup

  ngOnInit(): void {
    this.campaignForm=this.formBuilder.group({
      name:["",Validators.required],
      description:["",Validators.required]
    })
    if(this.updateData){
      this.campaignForm.controls["name"].setValue(this.updateData.name);
      this.campaignForm.controls["description"].setValue(this.updateData.description);
    }
  }

  updateCampaign(){
    if (this.campaignForm.valid) {
      const campaign:Campaign=new Campaign();
      campaign.id=this.updateData.id;
      campaign.name=this.campaignForm.controls["name"].value;
      campaign.description=this.campaignForm.controls["description"].value;
      campaign.createdDate=this.updateData.createdDate;
      campaign.updatedDate=null;
      campaign.status=this.updateData.status;

      this.campaignService.update(campaign)
    }
    this.campaignForm.reset();
    //When save button on clicked, dialog will close
  this.dialogRef.close();
  }
}
