import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertifyMessageType, AlertifyPosition, AlertifyService } from 'app/services/admin/alertify.service';
import { ProductService } from 'app/services/common/modals/product.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public deletedData:any,private productService: ProductService,public dialogRef: MatDialogRef<DeleteDialogComponent>,private alertifyService:AlertifyService) { }

  ngOnInit(): void {
  }

  //TODO Silinme animasyonu eklenecek
  deleteProduct() {
    this.productService.delete(this.deletedData.id,()=>{
      this.alertifyService.message("Ürün başarıyla silindi.",{
        messageType:AlertifyMessageType.Success,
        position:AlertifyPosition.BottomRight
      })
    });
    this.dialogRef.close();
  }

}
