import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AlertifyMessageType, AlertifyPosition, AlertifyService } from 'app/services/admin/alertify.service';
import { ProductService } from 'app/services/common/modals/product.service';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent implements OnInit {

  productForm: FormGroup;
  constructor(public dialogRef: MatDialogRef<AddDialogComponent>,
    private formBuilder:FormBuilder,private productService:ProductService,private alertifyService:AlertifyService) { }

  ngOnInit(): void {
    this.productForm=this.formBuilder.group({
      name:["",Validators.required],
      category:[""],
      price:["",Validators.required],
      stock:["",Validators.required],
    })
  }

  addProduct(){
    if (this.productForm.valid) {
      this.productService.create(this.productForm.value,()=>{
        this.alertifyService.message("Ürün başarıyla eklendi.",{
          messageType:AlertifyMessageType.Success,
          position:AlertifyPosition.BottomRight
        })
      })
    }
    this.productForm.reset();
    //When save button on clicked, dialog will close
  this.dialogRef.close();
  }

}
