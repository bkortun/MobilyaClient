import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertifyMessageType, AlertifyPosition, AlertifyService } from 'app/services/admin/alertify.service';
import { AuthService } from 'app/services/common/modals/auth.service';
import { UserService } from 'app/services/common/modals/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  registerForm:FormGroup

  constructor(private router:Router, private formBuilder:FormBuilder,
    private userService:UserService,private alertifyService:AlertifyService,
    private authService:AuthService) { }

  ngOnInit(): void {
    this.registerForm=this.formBuilder.group({
      firstName:["",Validators.required],
      lastName:["",Validators.required],
      email:["",Validators.required],
      password:["",Validators.required],
    })
  }

  register(){
    if (this.registerForm.valid) {
     this.userService.register(this.registerForm.value,()=>{
      this.authService.checkToken()
        this.alertifyService.message("Kayıt Başarılı",{
          messageType:AlertifyMessageType.Success,
          position:AlertifyPosition.BottomRight
        })
        this.router.navigate([`/`]);
      },(error)=>{})
    }
  }
}
