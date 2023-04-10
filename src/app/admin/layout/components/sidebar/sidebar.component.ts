import { Component, OnInit } from '@angular/core';
import { BaseComponent, SpinnerType } from 'app/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent extends BaseComponent implements OnInit {

  constructor(spinner:NgxSpinnerService) {
    super(spinner)
   }

  ngOnInit(): void {
  }

  logOut() {
    this.showSpinner(SpinnerType.BallClimbingDot)
    localStorage.removeItem("token");
    this.hideSpinner(SpinnerType.BallClimbingDot);
  }
}
