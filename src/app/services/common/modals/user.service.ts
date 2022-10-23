import { Token } from '../../../contracts/user/token';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientService:HttpClientService) { }

  async login(email:string,password:string,callBackFunction:()=>void):Promise<any>{
    const observable:Observable<any|Token>= this.httpClientService.post<any|Token>({
      controller:"auth",
      action:"login"
    },{email,password});
    const tokenResponse:Token = await firstValueFrom(observable) as Token;
    if(tokenResponse){
      localStorage.setItem("token",tokenResponse.token);
    }
    callBackFunction();
  }
}
