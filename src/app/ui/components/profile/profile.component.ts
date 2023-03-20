import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAddress } from 'app/contracts/address/user_address';
import { FileDeployOptions } from 'app/contracts/file/options/fileDeployOptions';
import { FileUploadOptions } from 'app/contracts/file/options/fileUploadOptions';
import { User } from 'app/contracts/user/user';
import { UserDetail } from 'app/contracts/user/userDetails';
import { FileUploadService } from 'app/services/common/file-upload/file-upload.service';
import { AddressService } from 'app/services/common/modals/address.service';
import { AuthService } from 'app/services/common/modals/auth.service';
import { UserService } from 'app/services/common/modals/user.service';
import { AddressDialogComponent } from './dialogs/address-dialog/address-dialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private authService: AuthService,
    private userService: UserService, private fileUploadService: FileUploadService,
    private activeRoute:ActivatedRoute,public dialog: MatDialog,private activatedRoute:ActivatedRoute,
    private addressService:AddressService) { }

  profileForm: FormGroup;
  user: User;
  userDetail: UserDetail;
  formData: FormData = new FormData();
  userAddresses:UserAddress[]
  selectedAddress:UserAddress=null;


  @Output() fileUploadOptions: Partial<FileUploadOptions> = {
    accept: ".jpg,.png,.jpeg",
    explanation: "Profil Resimi Ekle...",
  }
  @Output() fileDeployOptions: Partial<FileDeployOptions> = {
    action:"ListProfilePhoto",
    controller:"userDetails",
    id:this.activeRoute.snapshot.paramMap.get("userId")
  }

  async ngOnInit() {
    this.initilazeForm();
    this.getAddresses();
    this.setValues();
  }

  initilazeForm() {
    this.profileForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", Validators.required],
      gender: [""],
      dateOfBirth: [""],
      phoneNumber: [""],
      // country: [""],
      // city: [""],
      // district: [""],
      // zipCode: [""],
      // address: [""],
    });
  }

  async setValues() {
    await this.getUserDetail();
    if (this.userDetail) {
      this.profileForm.controls["firstName"].setValue(this.userDetail.firstName);
      this.profileForm.controls["lastName"].setValue(this.userDetail.lastName);
      this.profileForm.controls["email"].setValue(this.userDetail.email);
      this.profileForm.controls["dateOfBirth"].setValue(this.userDetail.dateOfBirth);
      if (this.userDetail.gender)
        this.profileForm.controls["gender"].setValue("Erkek");
      else
        this.profileForm.controls["gender"].setValue("Kadın");
      this.profileForm.controls["phoneNumber"].setValue(this.userDetail.phoneNumber);
    }
  }

  async getUserDetail() {
    const userId = this.authService.decodeToken().nameIdentifier;
    this.userDetail = await this.userService.listUserDetailByUserId(userId);
  }

  async saveUserInfos() {
    let profilePhotoId:string=await this.uploadProfilePhoto(this.userDetail.userId);
    if (this.profileForm.valid) {
      if (this.profileForm.value["gender"] == "Erkek")
        this.profileForm.value["gender"] = true
      else
        this.profileForm.value["gender"] = false

      this.profileForm.value["userId"] = this.userDetail.userId;
      this.profileForm.value["profilePhotoId"] = profilePhotoId;
      this.profileForm.value["id"] = this.userDetail.id;
      console.log(this.profileForm.value)
      await this.userService.updateDetails(this.profileForm.value);
    }
  }

  async uploadProfilePhoto(userId: string):Promise<string> {
    if (this.formData) {
      let uploadedImage=await this.fileUploadService.uploadFile(this.formData, {
        action: "Upload",
        controller: "userDetails",
        queryString: `userId=${userId}`
      })
      return uploadedImage["profilePhotoId"];
    }
    return null;
  }

  getFileData(obj: FormData) {
    this.formData = obj
  }

  openDialog() {
    const dialogRef=this.dialog.open(AddressDialogComponent, {
      width: "50%",
      height: "85%"
    });
  }


  async getAddresses(){
    const list=await this.addressService.getAddresses(this.activatedRoute.snapshot.paramMap.get("userId"));
    this.userAddresses=list.items;
  }

  getAddressId(id:string){
    this.userAddresses.forEach(userAddress => {
      if(userAddress.addressId==id)
        this.selectedAddress=userAddress;
    });
  }

  async deleteSelectedAddress(addressId:string){
    this.addressService.delete(addressId);
    this.selectedAddress=null;
  }
}
