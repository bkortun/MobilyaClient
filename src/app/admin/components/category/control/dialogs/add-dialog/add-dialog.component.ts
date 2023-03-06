import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from 'app/services/common/modals/category.service';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddDialogComponent>,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
  ) { }

  categoryForm: FormGroup;

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      name: ["", Validators.required]
    })
  }

  async addCategory() {
    if (this.categoryForm.valid){
      await this.categoryService.create(this.categoryForm.value)

    }
    this.categoryForm.reset();
    //When save button on clicked, dialog will close
    this.dialogRef.close();
  }

}
