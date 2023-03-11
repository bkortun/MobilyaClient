import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'app/services/common/modals/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private authService:AuthService) { }

  profileForm: FormGroup

  async ngOnInit() {
    await this.getUser();
    this.profileForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", Validators.required],
      country: [""],
      city: [""],
      district: [""],
      zipCode: [""],
      address: [""],
      address2: [""],
    })
  }

  async getUser() {
    const userId=this.authService.decodeToken().nameIdentifier
  }

  saveUserInfos(){

  }

}
