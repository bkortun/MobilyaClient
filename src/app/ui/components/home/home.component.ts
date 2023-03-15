import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Campaign } from 'app/contracts/campaign/campaign';
import { BaseStorageUrl } from 'app/contracts/setting/baseStorageUrl';
import { CampaignService } from 'app/services/common/modals/campaign.service';
import { ImageService } from 'app/services/common/modals/image.service';
import { SettingService } from 'app/services/common/modals/setting.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private campaignService:CampaignService, private settingService:SettingService, private imageService:ImageService,private router:Router) { }

  campaigns:Campaign[]
  baseUrl:BaseStorageUrl

  ngOnInit(): void {
    this.getBaseUrl();
    this.listCampaign();
  }

  async listCampaign(){
    const listObject=await this.campaignService.list();
    this.campaigns=listObject.items;
    this.campaigns.forEach(async campaign => {
      campaign.image=await this.listCampaignImage(campaign.id)
    });
  }

  async listCampaignImage(id){
    const listObject=await this.imageService.listCampaignImage(id);
    return listObject.items[0]
  }

  async getBaseUrl(){
    this.baseUrl=await this.settingService.getBaseStorageUrl();
  }

}
