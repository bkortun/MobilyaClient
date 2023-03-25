import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClientService } from '../http-client.service';
import { AuthService as RoleService } from '../../admin/auth.service';
import { ListObject } from 'app/contracts/common/list_object';
import { OperationClaimWithEmail } from 'app/contracts/user/operationClaim_email';
import { DecodedJWT } from 'app/contracts/user/decodeJwt';


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
    console.log(this.isAuthenticated)
  }

  decodeToken(){
    const token: string = localStorage.getItem("token")
    if(token){
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace('-', '+').replace('_', '/');
      const json= JSON.parse(window.atob(base64)) ;
      this.renameKey(json,"http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier","nameIdentifier");
      this.renameKey(json,"http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name","name");
      this.renameKey(json,"http://schemas.microsoft.com/ws/2008/06/identity/claims/role","roles");
      //const updatedJson=JSON.stringify(json);
      return json as DecodedJWT;
    }
    return null;
  }

  private renameKey ( obj, oldKey, newKey ) {
    obj[newKey] = obj[oldKey];
    delete obj[oldKey];
  }

  get isAuthenticated() {
    return this._isAuthenticated
  }

  getRoles(){
    return this.roles
  }
}



