import { Token } from '../../../contracts/user/token';
import { Injectable } from '@angular/core';
import { catchError, firstValueFrom, Observable, of } from 'rxjs';
import { HttpClientService } from '../http-client.service';
import { Register } from 'app/contracts/user/register';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClientService: HttpClientService) { }

  errorMessage: string;

  async login(email: string, password: string, callBackFunction: () => void, errorCallBack: (error) => void): Promise<any> {
    const observable: Observable<any | Token> = this.httpClientService.post<any | Token>(
      {
        controller: 'auth',
        action: 'login',
      },
      { email, password }
    ).pipe(catchError((error) => {
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
}
