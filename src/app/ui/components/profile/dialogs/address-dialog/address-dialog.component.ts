import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent, SpinnerType } from 'app/base/base.component';
import { UserAddress } from 'app/contracts/address/user_address';
import { AddressService } from 'app/services/common/modals/address.service';
import { AuthService } from 'app/services/common/modals/auth.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'app/services/ui/custom-toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-address-dialog',
  templateUrl: './address-dialog.component.html',
  styleUrls: ['./address-dialog.component.css']
})
export class AddressDialogComponent extends BaseComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddressDialogComponent>,
    private formBuilder: FormBuilder, private addressService:AddressService,
    private authService:AuthService,private toastrService:CustomToastrService,spinner:NgxSpinnerService) {
      super(spinner)
    }

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
    this.showSpinner(SpinnerType.BallClimbingDot)
    if(this.addressForm.valid){
      const userId:string= this.authService.decodeToken().nameIdentifier;
      const address=await this.addressService.create(this.addressForm.value);
      await this.addressService.createUserDetailAddress(address.id,userId,()=>{
        this.hideSpinner(SpinnerType.BallClimbingDot);
        this.toastrService.message("Adres kaydedildi",
        "Bilgilendirme",{messageType:ToastrMessageType.Info,position:ToastrPosition.BottomRight})
      });
    }
    this.addressForm.reset();
    this.dialogRef.close();
  }


}
