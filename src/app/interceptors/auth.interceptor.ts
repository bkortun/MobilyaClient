import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpStatusCode
} from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'app/services/ui/custom-toastr.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private toastrService: CustomToastrService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token = localStorage.getItem("token")
    let newRequest: HttpRequest<any> = request.clone({
      headers: request.headers.set("Authorization", "Bearer " + token)
    })
    return next.handle(newRequest).pipe(catchError(err => {
      this.throwErrorByStatusCode(err)
      return of(err)
    }));
  }


  private throwErrorByStatusCode(err) {
    let message= err.error.split(': ')[1].split('\r')[0]
    switch (err.status) {
      case HttpStatusCode.Unauthorized:
        this.toastrService.message(message,"Yetkisiz İşlem!",{messageType:ToastrMessageType.Error,position:ToastrPosition.BottomRight})
        break;
      case HttpStatusCode.BadRequest:
        this.toastrService.message(message,"Geçersiz İstek!",{messageType:ToastrMessageType.Error,position:ToastrPosition.BottomRight})
        break;
      case HttpStatusCode.InternalServerError:
        this.toastrService.message(message,"Sunucu Hatası!",{messageType:ToastrMessageType.Error,position:ToastrPosition.BottomRight})
        break;
      case HttpStatusCode.NotFound:
        this.toastrService.message(message,"Sayfa Bulunamadı!",{messageType:ToastrMessageType.Error,position:ToastrPosition.BottomRight})
        break;
      default:
        this.toastrService.message(message,"Hata!",{messageType:ToastrMessageType.Error,position:ToastrPosition.BottomRight})
        break;
    }
  }
}
