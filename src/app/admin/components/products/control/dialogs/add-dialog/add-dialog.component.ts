import { Component, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CategoryResponse } from 'app/contracts/category/category_response';
import { FileUploadOptions } from 'app/contracts/file/options/fileUploadOptions';
import { AddCategoryProduct } from 'app/contracts/product/addCategory_product';
import { CreateProduct } from 'app/contracts/product/create_product';
import { AlertifyMessageType, AlertifyPosition, AlertifyService } from 'app/services/admin/alertify.service';
import { FileUploadService } from 'app/services/common/file-upload/file-upload.service';
import { CategoryService } from 'app/services/common/modals/category.service';
import { ProductService } from 'app/services/common/modals/product.service';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent implements OnInit {

  productForm: FormGroup;
  formData: FormData = new FormData();
  categories:CategoryResponse[]=[];

  @Output() fileUploadOptions: Partial<FileUploadOptions> = {
    accept: ".jpg,.png,.jpeg",
    explanation: "Resim Ekle...",
  }

  constructor(
    public dialogRef: MatDialogRef<AddDialogComponent>,
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private categoryService:CategoryService,
    private alertifyService: AlertifyService,
    private fileUploadService: FileUploadService) { }

  ngOnInit(): void {
    this.listCategories();
    this.productForm = this.formBuilder.group({
      name: ["", Validators.required],
      category: [""],
      price: ["", Validators.required],
      stock: ["", Validators.required],
    })
  }

  async addProduct() {
    let id:string
    if (this.productForm.valid) {
      await this.productService.create(this.productForm.value, () => {
        this.alertifyService.message("Ürün başarıyla eklendi.", {
          messageType: AlertifyMessageType.Success,
          position: AlertifyPosition.BottomRight
        })
      }).then(p => {
        id=p.id
        if (this.formData) {
         this.fileUploadService.uploadFile(this.formData, {
            action: "productImageUpload",
            controller: "productImages",
            queryString: `productId=${p.id}`
          })
        }
      }).then(c=>{
        let body=new AddCategoryProduct();
        body.productId=id
        this.productForm.value["category"]?.forEach(category => {
          if(category)
            body.categoryId=category
          this.productService.addCategory(body)
        });
      })
    }
    this.productForm.reset();
    //When save button on clicked, dialog will close
    this.dialogRef.close();
  }

  async listCategories(){
    let list =await this.categoryService.list();
    this.categories=list.items
  }

  getFileData(obj: FormData) {
    this.formData = obj
  }


}
