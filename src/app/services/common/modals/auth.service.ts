import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClientService } from '../http-client.service';
import { AuthService as RoleService } from '../../admin/auth.service';
import { ListObject } from 'app/contracts/common/list_object';
import { OperationClaimWithEmail } from 'app/contracts/user/operationClaim_email';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private jwtHelper: JwtHelperService, private roleService: RoleService) { }

  private _isAuthenticated: boolean
  roles: string[]=[]

  async checkToken(email?: string) {

    const token: string = localStorage.getItem("token")

    let isExpired: boolean;
    try {
      isExpired = this.jwtHelper.isTokenExpired(token)
    } catch {
      isExpired = true
    }
    this._isAuthenticated=token!=null || !isExpired

    if(email){
      const claims: ListObject = await this.roleService.listOperationClaimByUserEmail(email)

      for(let i=0;i<claims.count;i++){
        this.roles.push(claims.items[i].name)
      }
    }

  }

  get isAuthenticated() {
    return this._isAuthenticated
  }

  getRoles(){
    return this.roles
  }
}


