import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BaseComponent, SpinnerType } from 'app/base/base.component';
import { AlertifyMessageType, AlertifyPosition, AlertifyService } from 'app/services/admin/alertify.service';
import { CategoryService } from 'app/services/common/modals/category.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent extends BaseComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddDialogComponent>,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private alertifyService:AlertifyService,
    spinner:NgxSpinnerService
  ) {
    super(spinner)
    this.showSpinner(SpinnerType.BallPulse)
   }

  categoryForm: FormGroup;

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      name: ["", Validators.required]
    })
    this.hideSpinner(SpinnerType.BallPulse)
  }

  async addCategory() {
    this.showSpinner(SpinnerType.BallPulse)
    if (this.categoryForm.valid){
      await this.categoryService.create(this.categoryForm.value,()=>{
        this.alertifyService.message("Kategori başarıyla eklendi.",{
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
