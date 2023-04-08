import { Component, OnInit } from '@angular/core';
import { BaseComponent, SpinnerType } from 'app/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent extends BaseComponent implements OnInit {

  constructor(spinner:NgxSpinnerService) {
    super(spinner)
    this.showSpinner(SpinnerType.BallClimbingDot)
   }

  ngOnInit(): void {
  }

}
