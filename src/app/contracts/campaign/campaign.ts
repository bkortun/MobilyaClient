import { ListCampaignImage } from "../file/list_campaignImage";

export class Campaign {
  id: string;
  name: string;
  description:string;
  imageId:string;
  image?:ListCampaignImage
  createdDate: Date;
  updatedDate: Date;
  status: boolean;
}
