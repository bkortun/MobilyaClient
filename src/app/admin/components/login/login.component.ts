import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyMessageType, AlertifyPosition, AlertifyService } from 'app/services/admin/alertify.service';
import { UserService } from 'app/services/common/modals/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute, private router: Router,private alertifyService:AlertifyService) { }

  ngOnInit(): void {
  }

  login(email: string, password: string) {
    this.userService.login(email, password, () => {
      this.activatedRoute.queryParams.subscribe(params=>{
          this.router.navigate(["/admin/"]);
    })
  },(error)=>{
    this.alertifyService.message(error,{
      position:AlertifyPosition.BottomRight,
      messageType:AlertifyMessageType.Error
    })
  })
  }
}
