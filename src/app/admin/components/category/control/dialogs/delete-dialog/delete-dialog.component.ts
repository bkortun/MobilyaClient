import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseComponent, SpinnerType } from 'app/base/base.component';
import { AlertifyMessageType, AlertifyPosition, AlertifyService } from 'app/services/admin/alertify.service';
import { CategoryService } from 'app/services/common/modals/category.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent extends BaseComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public deletedData:any,private categoryService: CategoryService,
  public dialogRef: MatDialogRef<DeleteDialogComponent>, private alertifyService:AlertifyService,
  spinner:NgxSpinnerService) {
    super(spinner)
    this.showSpinner(SpinnerType.BallPulse)
   }

  ngOnInit(): void {
    this.hideSpinner(SpinnerType.BallPulse)
  }

  //TODO Silinme animasyonu eklenecek
  deleteCategory() {
    this.showSpinner(SpinnerType.BallPulse)
    this.categoryService.delete(this.deletedData.id,()=>{
      this.alertifyService.message("Kategori başarıyla silindi.",{
        messageType:AlertifyMessageType.Warning,
        position:AlertifyPosition.BottomRight
      })
    });
    this.dialogRef.close();
    this.hideSpinner(SpinnerType.BallPulse)

  }

}
