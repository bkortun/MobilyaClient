import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CampaignService } from 'app/services/common/modals/campaign.service';
import { AddDialogComponent } from './dialogs/add-dialog/add-dialog.component';
import { DeleteDialogComponent } from './dialogs/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css']
})
export class ControlComponent implements OnInit {

  constructor(public dialog:MatDialog) { }

  ngOnInit(): void {
  }

  openDialog() {
    const dialogRef=this.dialog.open(AddDialogComponent, {
      width: "50%",
      height: "40%"
    });
  }
}
