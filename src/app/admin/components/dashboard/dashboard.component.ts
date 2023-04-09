import { Component, OnInit } from '@angular/core';
import { BaseComponent, SpinnerType } from 'app/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent extends BaseComponent implements OnInit  {

  constructor(spinner:NgxSpinnerService) {
    super(spinner)
    this.showSpinner(SpinnerType.BallPulse)
   }

  ngOnInit(): void {
  }

}
