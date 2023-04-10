import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyMessageType, AlertifyPosition, AlertifyService } from 'app/services/admin/alertify.service';
import { AuthService } from 'app/services/common/modals/auth.service';
import { UserService } from 'app/services/common/modals/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService,
     private activatedRoute: ActivatedRoute,
      private router: Router,
      private alertifyService:AlertifyService,
      private authService:AuthService) { }

  ngOnInit(): void {
  }

  async login(email: string, password: string) {
    await this.userService.login(email,password,()=>this.authService.checkToken())
console.log(this.authService.decodeToken())
    this.activatedRoute.queryParams.subscribe(params => {
      const returnUrl: string = params["returnUrl"];
      if (returnUrl)
        this.router.navigateByUrl(returnUrl)
      else
        this.router.navigateByUrl("/admin")
    });
  }
}
