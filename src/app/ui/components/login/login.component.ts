import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'app/services/common/modals/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup
  constructor(private router:Router,private formBuilder:FormBuilder, private userService:UserService) { }

  ngOnInit(): void {
    this.loginForm=this.formBuilder.group({
      email:["",Validators.required],
      password:["",Validators.required],
    })
  }

  login(){
    if (this.loginForm.valid) {
      this.userService.login(this.loginForm.value["email"],this.loginForm.value["password"],()=>{
        this.router.navigate(['/']);
      })

     }
  }

}
