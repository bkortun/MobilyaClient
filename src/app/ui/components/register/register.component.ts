import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseComponent, SpinnerType } from 'app/base/base.component';
import { AlertifyMessageType, AlertifyPosition, AlertifyService } from 'app/services/admin/alertify.service';
import { AuthService } from 'app/services/common/modals/auth.service';
import { UserService } from 'app/services/common/modals/user.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'app/services/ui/custom-toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent extends BaseComponent implements OnInit {

  registerForm: FormGroup

  constructor(private router: Router, private formBuilder: FormBuilder,
    private userService: UserService, private toastrService: CustomToastrService,
    private authService: AuthService, spinner: NgxSpinnerService) {
    super(spinner)
    this.showSpinner(SpinnerType.BallClimbingDot)
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required],
    })
    this.hideSpinner(SpinnerType.BallClimbingDot)
  }

  register() {
    this.showSpinner(SpinnerType.BallClimbingDot)
    if (this.registerForm.valid) {
      this.userService.register(this.registerForm.value, async () => {
        await this.authService.checkToken()
        this.showSpinner(SpinnerType.BallClimbingDot)
        this.toastrService.message("Kayıt işlemi başarılı bir şekilde gerçekleştirildi!",
          "Hoşgeldin", { messageType: ToastrMessageType.Success, position: ToastrPosition.BottomRight })
        this.router.navigate([`/profile/${this.authService.decodeToken().nameIdentifier}`]);
      })
    }
  }
}
