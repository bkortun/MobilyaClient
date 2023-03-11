import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CampaignService } from 'app/services/common/modals/campaign.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public deletedData:any,private campaignService: CampaignService,
  public dialogRef: MatDialogRef<DeleteDialogComponent>) { }

  ngOnInit(): void {
  }

  //TODO Silinme animasyonu eklenecek
  deleteCampaign() {
    this.campaignService.delete(this.deletedData.id);
    this.dialogRef.close();
  }
}
