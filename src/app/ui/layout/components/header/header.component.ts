import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/common/modals/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  constructor(public authService:AuthService) {
    authService.checkToken()
  }

  ngOnInit(): void {
  }

  logOut(){
    localStorage.removeItem("token")
    this.authService.checkToken()
  }

}
