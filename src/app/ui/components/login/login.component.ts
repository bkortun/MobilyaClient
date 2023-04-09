import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseComponent, SpinnerType } from 'app/base/base.component';
import { AuthService } from 'app/services/common/modals/auth.service';
import { UserService } from 'app/services/common/modals/user.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'app/services/ui/custom-toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends BaseComponent implements OnInit {

  loginForm: FormGroup
  submitted=false;

  constructor(private router: Router, private formBuilder: FormBuilder,
    private userService: UserService, private authService: AuthService,
    private toastrService: CustomToastrService, spinner: NgxSpinnerService) {
    super(spinner)
    this.showSpinner(SpinnerType.BallClimbingDot);
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
    })
    this.hideSpinner(SpinnerType.BallClimbingDot);
  }

  async login() {
    console.log(this.loginForm.controls["email"].errors)
    this.showSpinner(SpinnerType.BallClimbingDot);
    this.submitted=true;
    if (this.loginForm.valid) {
      await this.userService.login(this.loginForm.value["email"], this.loginForm.value["password"], () => {
        this.hideSpinner(SpinnerType.BallClimbingDot);
        this.toastrService.message("Giriş işlemi başarılı!", "Hoşgeldin",
          { messageType: ToastrMessageType.Success, position: ToastrPosition.BottomRight });
        this.router.navigate(['/']);
      })
    }
  }

}
