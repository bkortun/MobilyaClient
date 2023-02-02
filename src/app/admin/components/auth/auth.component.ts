import { Component, OnInit } from '@angular/core';
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

  constructor(private authService:AuthService) { }

  async ngOnInit() {
    await this.getOperationClaims()
  }

  async getOperationClaims(){
    const claims:ListObject= await this.authService.listOperationClaim()
    this.operationClaims=claims.items
  }

  async getOperationClaimsByEmail(email:string){
    console.log(email)
    const claims:ListObject=await this.authService.listOperationClaimByUserEmail(email)
    console.log(claims)
    this.emailClaims=claims.items
    this.isClicked=true
    console.log(this.emailClaims)
  }

  public checkIt(claim:OperationClaim):boolean{
    for(let i=0;i<this.emailClaims.length;i++){
      if(this.emailClaims[i].name==claim.name)
        return true
    }
    return false
  }

}
