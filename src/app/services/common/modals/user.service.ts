import { Token } from '../../../contracts/user/token';
import { Injectable } from '@angular/core';
import { catchError, firstValueFrom, Observable, of } from 'rxjs';
import { HttpClientService } from '../http-client.service';
import { Register } from 'app/contracts/user/register';
import { ListObject } from 'app/contracts/common/list_object';
import { UserDetail } from 'app/contracts/user/userDetails';
import { User } from 'app/contracts/user/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClientService: HttpClientService) { }

  errorMessage: string;

  async login(email: string, password: string, callBackFunction?: () => void): Promise<any> {
    const observable: Observable<any | Token> = this.httpClientService.post<any | Token>(
      {
        controller: 'auth',
        action: 'login',
      },
      { email, password }
    )
    const tokenResponse: Token = (await firstValueFrom(observable)) as Token;
    if (tokenResponse) {
      localStorage.setItem('token', tokenResponse.token);
    }
    callBackFunction()
  }

  async register(register: Register, callBackFunction: () => void, errorCallBack: (error) => void): Promise<any> {
    const observable: Observable<any | Token> = this.httpClientService.post<any | Token>({
      controller: "auth",
      action: "register"
    }, register).pipe(catchError((error) => {
      if (error.error instanceof ErrorEvent) {
        this.errorMessage = `Error: ${error.error.message}`;
      } else {
        this.errorMessage = `Error: ${error.message}`;
      }
      return of([]);
    }));
    const tokenResponse: Token = (await firstValueFrom(observable)) as Token;
    if (tokenResponse) {
      localStorage.setItem('token', tokenResponse.token);
    }
    callBackFunction();
    errorCallBack(this.errorMessage);
  }

  async listUserDetails(page,size):Promise<ListObject>{
    const observable:Observable<ListObject>=this.httpClientService.get({
      controller:"userDetails",
      queryString:`page=${page}&pageSize=${size}`

    })
    return await firstValueFrom(observable) as ListObject
  }

  //this func just get all user details
  async listUserDetailByUserId(userId:string){
    const observable:Observable<UserDetail>=this.httpClientService.get({
      controller:"userDetails"
    },userId)
    return await firstValueFrom(observable) as UserDetail
  }

  //this func just get only user data (first,lastName,email)
  async listByUserId(userId:string){
    const observable:Observable<User>=this.httpClientService.get({
      controller:"users"
    },userId)
    return await firstValueFrom(observable) as User
  }

  async updateDetails(userDetail:UserDetail){
    const observable:Observable<UserDetail>=this.httpClientService.put({
      controller:"userDetails"
    },userDetail)
    return await firstValueFrom(observable) as UserDetail
  }

  //userDetailadrress list
  //userDetailadrress create

}
