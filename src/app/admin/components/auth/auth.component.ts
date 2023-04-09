import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { BaseComponent, SpinnerType } from 'app/base/base.component';
import { ListObject } from 'app/contracts/common/list_object';
import { OperationClaim } from 'app/contracts/user/operationClaim';
import { OperationClaimWithEmail } from 'app/contracts/user/operationClaim_email';
import { AlertifyMessageType, AlertifyPosition, AlertifyService } from 'app/services/admin/alertify.service';
import { AuthService } from 'app/services/admin/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent extends BaseComponent implements OnInit {

  operationClaims:OperationClaim[]
  emailClaims:OperationClaimWithEmail[]
  isClicked=false
  currentEmail:string=""

  constructor(private authService:AuthService,private alertifyService:AlertifyService,
    spinner:NgxSpinnerService) {
      super(spinner)
      this.showSpinner(SpinnerType.BallPulse)
     }

  async ngOnInit() {
    await this.getOperationClaims()
    this.hideSpinner(SpinnerType.BallPulse)
  }

  async getOperationClaims(){
    const claims:ListObject= await this.authService.listOperationClaim()
    this.operationClaims=claims.items
  }

  async getOperationClaimsByEmail(email:string){
    this.showSpinner(SpinnerType.BallPulse)
    this.currentEmail=email
    const claims:ListObject=await this.authService.listOperationClaimByUserEmail(email)
    this.emailClaims=claims.items
    this.isClicked=true
    this.hideSpinner(SpinnerType.BallPulse)
  }

  checkIt(claim:OperationClaim):boolean{
    for(let i=0;i<this.emailClaims.length;i++){
      if(this.emailClaims[i].name==claim.name)
        return true
    }
    return false
  }


 async getStatus(event:MatSlideToggleChange){
  this.showSpinner(SpinnerType.BallPulse)
  let claimName=event.source.name
  if(event.checked){
    await this.authService.addOperationClaimToUser({email:this.currentEmail,operationClaimName:claimName},()=>{
      this.alertifyService.message("Kullanıcıya yetki verildi.",{
        messageType:AlertifyMessageType.Warning,
        position:AlertifyPosition.BottomRight
      })
    })
  }else{
    let id:string=this.findIdOfUserOperationClaim(claimName)
    await this.authService.removeOperationClaimFromUser(id,()=>{
      this.alertifyService.message("Kullanıcıdan yetki alındı.",{
        messageType:AlertifyMessageType.Warning,
        position:AlertifyPosition.BottomRight
      })
    })
  }
  this.emailClaims=[];
  await this.getOperationClaimsByEmail(this.currentEmail);
  this.hideSpinner(SpinnerType.BallPulse)
 }

 private findIdOfUserOperationClaim(name:string):string{
  for(let i=0;i<this.emailClaims.length;i++){
    if(this.emailClaims[i].name==name)
      return this.emailClaims[i].id
  }
  return "emailClaims_bulunamadı"
 }

}
