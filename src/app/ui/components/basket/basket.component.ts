import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/common/modals/auth.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  constructor(private authService:AuthService) { }

  userId:string;

  ngOnInit(): void {
    this.userId=this.getUserId();
  }

  getUserId(){
    return this.authService.decodeToken().nameIdentifier;
  }
}
