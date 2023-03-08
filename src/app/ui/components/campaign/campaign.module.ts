import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignComponent } from './campaign.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    CampaignComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path:"",component:CampaignComponent}])
  ]
})
export class CampaignModule { }
