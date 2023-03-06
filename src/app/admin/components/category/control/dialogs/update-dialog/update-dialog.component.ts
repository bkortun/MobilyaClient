import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'app/contracts/category/category';
import { CategoryService } from 'app/services/common/modals/category.service';

@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.css']
})
export class UpdateDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public updateData:any, public dialogRef: MatDialogRef<UpdateDialogComponent>,
  private formBuilder:FormBuilder,private categoryService:CategoryService) { }
  categoryForm:FormGroup

  ngOnInit(): void {
    this.categoryForm=this.formBuilder.group({
      name:["",Validators.required]
    })
    if(this.updateData){
      this.categoryForm.controls["name"].setValue(this.updateData.name);
    }
  }

  updateCategory(){
    if (this.categoryForm.valid) {
      const category:Category=new Category();
      category.id=this.updateData.id;
      category.name=this.categoryForm.controls["name"].value;
      category.createdDate=this.updateData.createdDate;
      category.updatedDate=null;
      category.status=this.updateData.status;

      this.categoryService.update(category)
    }
    this.categoryForm.reset();
    //When save button on clicked, dialog will close
  this.dialogRef.close();
  }

}
