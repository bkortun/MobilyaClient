import { Token } from '../../../contracts/user/token';
import { Injectable } from '@angular/core';
import { catchError, firstValueFrom, Observable, of } from 'rxjs';
import { HttpClientService } from '../http-client.service';
import { Register } from 'app/contracts/user/register';
import { ListObject } from 'app/contracts/common/list_object';
import { UserDetail } from 'app/contracts/user/userDetails';
import { User } from 'app/contracts/user/user';
import { UserAddress } from 'app/contracts/address/user_address';

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
    callBackFunction();
  }

  async register(register: Register, callBackFunction?: () => void): Promise<any> {
    const observable: Observable<any | Token> = this.httpClientService.post<any | Token>({
      controller: "auth",
      action: "register"
    }, register)
    const tokenResponse: Token = (await firstValueFrom(observable)) as Token;
    if (tokenResponse) {
      localStorage.setItem('token', tokenResponse.token);
    }
    callBackFunction();
  }

  async listUserDetails(page, size): Promise<ListObject> {
    const observable: Observable<ListObject> = this.httpClientService.get({
      controller: "userDetails",
      queryString: `page=${page}&pageSize=${size}`

    })
    let response= await firstValueFrom(observable) as ListObject;
    return response;
  }

  //this func just get all user details
  async listUserDetailByUserId(userId: string) {
    const observable: Observable<UserDetail> = this.httpClientService.get({
      controller: "userDetails"
    }, userId)
    let response=  await firstValueFrom(observable) as UserDetail
    return response;
  }

  //this func just get only user data (first,lastName,email)
  async listByUserId(userId: string) {
    const observable: Observable<User> = this.httpClientService.get({
      controller: "auth",
      action:"listById"
    }, userId)
    let response=  await firstValueFrom(observable) as User
    return response;
  }

  async updateDetails(userDetail: UserDetail, callBackFunction?: () => void) {
    const observable: Observable<UserDetail> = this.httpClientService.put({
      controller: "userDetails"
    }, userDetail)
    let response=  await firstValueFrom(observable) as UserDetail
    callBackFunction();
    return response;
  }

}
