import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Campaign } from 'app/contracts/campaign/campaign';
import { CampaignService } from 'app/services/common/modals/campaign.service';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css']
})
export class CampaignComponent implements OnInit {

  constructor(private campaignService: CampaignService, private activeRoute: ActivatedRoute) { }

  campaign: Campaign

  async ngOnInit() {
    let campaignId = this.activeRoute.snapshot.paramMap.get("campaignId");
    this.getCampaign(campaignId);
  }

  async getCampaign(campaignId: string) {
    this.campaign = await this.campaignService.listById(campaignId);
  }
}
