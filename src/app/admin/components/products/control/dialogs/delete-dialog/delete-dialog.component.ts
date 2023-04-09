import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseComponent, SpinnerType } from 'app/base/base.component';
import { AlertifyMessageType, AlertifyPosition, AlertifyService } from 'app/services/admin/alertify.service';
import { ProductService } from 'app/services/common/modals/product.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent extends BaseComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public deletedData:any,private productService: ProductService,
  public dialogRef: MatDialogRef<DeleteDialogComponent>,private alertifyService:AlertifyService,
  spinner:NgxSpinnerService) {
    super(spinner)
   }

  ngOnInit(): void {
  }

  //TODO Silinme animasyonu eklenecek
  deleteProduct() {
    this.showSpinner(SpinnerType.BallPulse)
    this.productService.delete(this.deletedData.id,()=>{
      this.alertifyService.message("Ürün başarıyla silindi.",{
        messageType:AlertifyMessageType.Warning,
        position:AlertifyPosition.BottomRight
      });
      this.hideSpinner(SpinnerType.BallPulse);
    });
    this.dialogRef.close();
  }

}
