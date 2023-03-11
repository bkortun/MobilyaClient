import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
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
  ) { }

  campaignForm: FormGroup;

  ngOnInit(): void {
    this.campaignForm = this.formBuilder.group({
      name: ["", Validators.required],
      description:["",Validators.required]
    })
  }

  async addCampaign() {
    if (this.campaignForm.valid){
      await this.campaignService.create(this.campaignForm.value)
    }
    this.campaignForm.reset();
    //When save button on clicked, dialog will close
    this.dialogRef.close();
  }

}
