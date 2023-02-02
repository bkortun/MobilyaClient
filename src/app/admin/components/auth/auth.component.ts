import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ListObject } from 'app/contracts/common/list_object';
import { OperationClaim } from 'app/contracts/user/operationClaim';
import { OperationClaimWithEmail } from 'app/contracts/user/operationClaim_email';
import { AuthService } from 'app/services/admin/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  operationClaims:OperationClaim[]
  emailClaims:OperationClaimWithEmail[]
  isClicked=false
  currentEmail:string=""

  constructor(private authService:AuthService) { }

  async ngOnInit() {
    await this.getOperationClaims()
  }

  async getOperationClaims(){
    const claims:ListObject= await this.authService.listOperationClaim()
    this.operationClaims=claims.items
  }

  async getOperationClaimsByEmail(email:string){
    this.currentEmail=email
    const claims:ListObject=await this.authService.listOperationClaimByUserEmail(email)
    this.emailClaims=claims.items
    this.isClicked=true
  }

  checkIt(claim:OperationClaim):boolean{
    for(let i=0;i<this.emailClaims.length;i++){
      if(this.emailClaims[i].name==claim.name)
        return true
    }
    return false
  }


 async getStatus(event:MatSlideToggleChange){
  let claimName=event.source.name
  if(event.checked){
    await this.authService.addOperationClaimToUser({email:this.currentEmail,operationClaimName:claimName})
  }else{
    let id:string=this.findIdOfUserOperationClaim(claimName)
    await this.authService.removeOperationClaimFromUser(id)
  }
 }

 private findIdOfUserOperationClaim(name:string):string{
  for(let i=0;i<this.emailClaims.length;i++){
    if(this.emailClaims[i].name==name)
      return this.emailClaims[i].id
  }
  //Slide'ı kapalı-açık-kapalı durumunda kullanırsan patlıyor çünkü id'yi bulamıyor bulması için sayfanın yenilenmesi lazım
  //buraya bir dialog konulup durum engellenebilir
  //TODO burdaki duruma çözüm bul
  return "emailClaims_bulunamadı"
 }

}
