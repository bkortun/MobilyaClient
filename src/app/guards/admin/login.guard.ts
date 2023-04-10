import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from 'app/services/common/modals/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.authService.checkToken();
      console.log("guard çalıştı")
      console.log(this.authService.isAuthenticated)
    if (!this.authService.isAuthenticated) {
      this.router.navigate(["admin/login"], {
        queryParams: { returnUrl: state.url }
      })
      return false;
    }

    let roles:string[]=new Array();
    if(typeof(this.authService.decodeToken().roles)==typeof(""))
      roles.push(this.authService.decodeToken().roles)
    else
      this.authService.decodeToken().roles.forEach(role=>roles.push(role));
    console.log(roles)
    const expectedRoles=route.data['expectedRoles']
    console.log(expectedRoles)
    const roleMatches=roles.findIndex(role=>expectedRoles.indexOf(role)!==-1)
    console.log((roleMatches<0)?false:true)
    return (roleMatches<0)?false:true;
  }

}
