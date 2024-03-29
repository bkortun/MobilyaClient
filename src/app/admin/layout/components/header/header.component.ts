import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'app/services/common/modals/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService:AuthService) { }

  @Input() drawer:any
  email:string

  ngOnInit(): void {
    this.getName();
  }

  getName(){
   this.email = this.authService.decodeToken().email;
  }

}
