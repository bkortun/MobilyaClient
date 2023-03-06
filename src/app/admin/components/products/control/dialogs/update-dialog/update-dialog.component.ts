import { Component, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'app/contracts/category/category';
import { CategoryResponse } from 'app/contracts/category/category_response';
import { FileDeployOptions } from 'app/contracts/file/options/fileDeployOptions';
import { FileUploadOptions } from 'app/contracts/file/options/fileUploadOptions';
import { AddCategoryProduct } from 'app/contracts/product/addCategory_product';
import { Product } from 'app/contracts/product/product';
import { AlertifyMessageType, AlertifyPosition, AlertifyService } from 'app/services/admin/alertify.service';
import { FileUploadService } from 'app/services/common/file-upload/file-upload.service';
import { CategoryService } from 'app/services/common/modals/category.service';
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
    private fileUploadService:FileUploadService, private categoryService:CategoryService) { }

    @Output() fileUploadOptions: Partial<FileUploadOptions> = {
      accept: ".jpg,.png,.jpeg",
      explanation: "Resim Ekle...",
      action:"productImageUpload",
      controller:"productImages",
      isAdminPage:true,
      isController:true,
      queryString:`productId=${this.updateData.id}`
    }

    @Output() fileDeployOptions: Partial<FileDeployOptions> = {
      action:"ListProductImages",
      controller:"productImages",
      queryString:`productId=${this.updateData.id}`,
      id:this.updateData.id
    }

    formData:FormData=new FormData();
    categories:CategoryResponse[]=[];


  ngOnInit(): void {
    this.listCategories();
    this.productForm=this.formBuilder.group({
      name:["",Validators.required],
      category:[""],
      price:["",Validators.required],
      stock:["",Validators.required],
    })
    if(this.updateData){
      this.productForm.controls["name"].setValue(this.updateData.name);
      this.productForm.controls["category"].setValue(this.updateData.category);
      this.productForm.controls["price"].setValue(this.updateData.price);
      this.productForm.controls["stock"].setValue(this.updateData.stock);
    }
  }
//Todo dialog açıldığında mevcut kategoriler getirilecek getByProductIdCategory
  updateProduct(){
    if (this.productForm.valid) {
      let id:string
      const product:Product=new Product();
      let categories:string[]=[];
      product.id=this.updateData.id;
      product.name=this.productForm.controls["name"].value;
      categories=this.productForm.controls["category"].value;
      console.log(categories)
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
          id=p.id
         this.fileUploadService.uploadFile(this.formData, {
            action: "productImageUpload",
            controller: "productImages",
            queryString: `productId=${p.id}`
          })
        }
      }).then(c=>{
        let body=new AddCategoryProduct();
        body.productId=id
        console.log(this.productForm.value["category"])
        categories?.forEach(category => {
          console.log(category)
          if(category)
            body.categoryId=category
          console.log(body)
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
