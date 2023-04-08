import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent, SpinnerType } from 'app/base/base.component';
import { Campaign } from 'app/contracts/campaign/campaign';
import { BaseStorageUrl } from 'app/contracts/setting/baseStorageUrl';
import { CampaignService } from 'app/services/common/modals/campaign.service';
import { ImageService } from 'app/services/common/modals/image.service';
import { SettingService } from 'app/services/common/modals/setting.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css']
})
export class CampaignComponent extends BaseComponent implements OnInit {

  constructor(private campaignService: CampaignService, private activeRoute: ActivatedRoute,
    private settingService: SettingService, private imageService: ImageService,
    spinner: NgxSpinnerService) {
    super(spinner)
    this.showSpinner(SpinnerType.BallClimbingDot)
  }

  campaign: Campaign
  baseUrl: BaseStorageUrl

  async ngOnInit() {
    let campaignId = this.activeRoute.snapshot.paramMap.get("campaignId");
    this.getbaseUrl();
    this.getCampaign(campaignId);
    this.hideSpinner(SpinnerType.BallClimbingDot)
  }

  async getCampaign(campaignId: string) {
    this.campaign = await this.campaignService.listById(campaignId);
    const listObject = await this.imageService.listCampaignImage(campaignId);
    this.campaign.image = listObject.items[0];
  }
  async getbaseUrl() {
    this.baseUrl = await this.settingService.getBaseStorageUrl();
  }
}
