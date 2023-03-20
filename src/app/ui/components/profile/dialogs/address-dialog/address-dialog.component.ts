import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { UserAddress } from 'app/contracts/address/user_address';
import { AddressService } from 'app/services/common/modals/address.service';
import { AuthService } from 'app/services/common/modals/auth.service';

@Component({
  selector: 'app-address-dialog',
  templateUrl: './address-dialog.component.html',
  styleUrls: ['./address-dialog.component.css']
})
export class AddressDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddressDialogComponent>,
    private formBuilder: FormBuilder, private addressService:AddressService, private authService:AuthService) { }

    addressForm:FormGroup;

  ngOnInit(): void {
    this.addressForm = this.formBuilder.group({
      title: ["", Validators.required],
      country: ["", Validators.required],
      city: ["", Validators.required],
      district: ["", Validators.required],
      neighbourhood: ["", Validators.required],
      addressDetail: ["", Validators.required],
      zipCode: ["", Validators.required],
    })
  }

  async addAddress(){
    if(this.addressForm.valid){
      const userId:string= this.authService.decodeToken().nameIdentifier;
      await this.addressService.create(this.addressForm.value)
    }
    this.addressForm.reset();
    this.dialogRef.close();
  }


}
