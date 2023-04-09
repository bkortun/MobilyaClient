import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseComponent, SpinnerType } from 'app/base/base.component';
import { Category } from 'app/contracts/category/category';
import { AlertifyMessageType, AlertifyPosition, AlertifyService } from 'app/services/admin/alertify.service';
import { CategoryService } from 'app/services/common/modals/category.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.css']
})
export class UpdateDialogComponent extends BaseComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public updateData:any, public dialogRef: MatDialogRef<UpdateDialogComponent>,
  private formBuilder:FormBuilder,private categoryService:CategoryService, private alertifyService:AlertifyService,
  spinner:NgxSpinnerService) {
    super(spinner)
    this.showSpinner(SpinnerType.BallPulse)
   }
  categoryForm:FormGroup

  ngOnInit(): void {
    this.categoryForm=this.formBuilder.group({
      name:["",Validators.required]
    })
    if(this.updateData){
      this.categoryForm.controls["name"].setValue(this.updateData.name);
    }
    this.hideSpinner(SpinnerType.BallPulse)
  }

  updateCategory(){
    this.showSpinner(SpinnerType.BallPulse)
    if (this.categoryForm.valid) {
      const category:Category=new Category();
      category.id=this.updateData.id;
      category.name=this.categoryForm.controls["name"].value;
      category.createdDate=this.updateData.createdDate;
      category.updatedDate=null;
      category.status=this.updateData.status;

      this.categoryService.update(category,()=>{
        this.alertifyService.message("Kategori başarıyla güncellendi.",{
          messageType:AlertifyMessageType.Success,
          position:AlertifyPosition.BottomRight
        })
      })
    }
    this.categoryForm.reset();
    //When save button on clicked, dialog will close
  this.dialogRef.close();
  this.hideSpinner(SpinnerType.BallPulse)
  }

}
