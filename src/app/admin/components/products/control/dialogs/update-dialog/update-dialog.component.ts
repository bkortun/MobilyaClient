import { Component, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileDeployOptions } from 'app/contracts/file/options/fileDeployOptions';
import { FileUploadOptions } from 'app/contracts/file/options/fileUploadOptions';
import { Product } from 'app/contracts/product/product';
import { AlertifyMessageType, AlertifyPosition, AlertifyService } from 'app/services/admin/alertify.service';
import { FileUploadService } from 'app/services/common/file-upload/file-upload.service';
import { ProductService } from 'app/services/common/modals/product.service';

@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.css']
})
export class UpdateDialogComponent implements OnInit {

  productForm: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public updateData:any, public dialogRef: MatDialogRef<UpdateDialogComponent>,
    private formBuilder:FormBuilder,private productService:ProductService,private alertifyService:AlertifyService,
    private fileUploadService:FileUploadService) { }

    @Output() fileUploadOptions: Partial<FileUploadOptions> = {
      accept: ".jpg,.png,.jpeg",
      explanation: "Resim Ekle...",
      action:"productImageUpload",
      controller:"products",
      isAdminPage:true,
      isController:true,
      queryString:`productId=${this.updateData.id}`
    }

    @Output() fileDeployOptions: Partial<FileDeployOptions> = {
      action:"ListProductImages",
      controller:"products",
      queryString:`productId=${this.updateData.id}`,
      id:this.updateData.id
    }

    formData:FormData=new FormData();


  ngOnInit(): void {
    this.productForm=this.formBuilder.group({
      name:["",Validators.required],
      category:[""],
      price:["",Validators.required],
      stock:["",Validators.required],
    })
    console.log(this.updateData)
    if(this.updateData){
      this.productForm.controls["name"].setValue(this.updateData.name);
      this.productForm.controls["category"].setValue(this.updateData.category);
      this.productForm.controls["price"].setValue(this.updateData.price);
      this.productForm.controls["stock"].setValue(this.updateData.stock);
    }
  }

  updateProduct(){
    if (this.productForm.valid) {
      const product:Product=new Product();
      product.id=this.updateData.id;
      product.name=this.productForm.controls["name"].value;
      //product.category=this.updateData.categorythis.productForm.controls["category"].value;
      product.price=this.productForm.controls["price"].value;
      product.stock=this.productForm.controls["stock"].value;
      product.createdDate=this.updateData.createdDate;
      product.updatedDate=null;
      product.status=this.updateData.status;

      this.productService.update(product,()=>{
        this.alertifyService.message("Ürün başarıyla eklendi.",{
          messageType:AlertifyMessageType.Success,
          position:AlertifyPosition.BottomRight
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
