import { Component, OnInit } from '@angular/core';
import { BaseComponent, SpinnerType } from 'app/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent extends BaseComponent implements OnInit {

  constructor(spinner:NgxSpinnerService) {
    super(spinner)
    this.showSpinner(SpinnerType.BallClimbingDot)
   }

  ngOnInit(): void {
  }

}
