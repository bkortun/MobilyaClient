import { Component, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CreateProduct } from 'app/contracts/product/create_product';
import { AlertifyMessageType, AlertifyPosition, AlertifyService } from 'app/services/admin/alertify.service';
import { FileUploadOptions } from 'app/services/common/file-upload/file-upload.component';
import { FileUploadService } from 'app/services/common/file-upload/file-upload.service';
import { ProductService } from 'app/services/common/modals/product.service';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent implements OnInit {

  productForm: FormGroup;
  formData: FormData = new FormData();

  @Output() fileOptions: Partial<FileUploadOptions> = {
    accept: ".jpg,.png,.jpeg",
    explanation: "Resim Ekle...",
  }

  constructor(
    public dialogRef: MatDialogRef<AddDialogComponent>,
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private alertifyService: AlertifyService,
    private fileUploadService: FileUploadService) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: ["", Validators.required],
      category: [""],
      price: ["", Validators.required],
      stock: ["", Validators.required],
    })
  }

  async addProduct() {
    if (this.productForm.valid) {
      await this.productService.create(this.productForm.value, () => {
        this.alertifyService.message("Ürün başarıyla eklendi.", {
          messageType: AlertifyMessageType.Success,
          position: AlertifyPosition.BottomRight
        })
      }).then(p => {
        if (this.formData) {
         this.fileUploadService.uploadFile(this.formData, {
            action: "productImageUpload",
            controller: "products",
            queryString: `productId=${p.id}`
          })
        }
      })
    }
    this.productForm.reset();
    //When save button on clicked, dialog will close
    this.dialogRef.close();
  }

  getFileData(obj: FormData) {
    this.formData = obj
  }

}
