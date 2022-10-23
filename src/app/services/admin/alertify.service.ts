import { Injectable } from '@angular/core';
declare var alertify: any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  message(message:string,options:Partial<AlertifyOptions>){
    alertify.set('notifier', 'delay', options.delay);
    alertify.set('notifier', 'position', options.position);
    const alert = alertify[options.messageType](message);
    if (options.dismissOthers)
      alert.dismissOthers();
  }
}

export class AlertifyOptions{
  messageType: AlertifyMessageType = AlertifyMessageType.Message;
  position: AlertifyPosition = AlertifyPosition.BottomRight;
  delay: number = 3;
  dismissOthers: boolean = false;
}


export enum AlertifyMessageType{
  Error = "error",
  Success = "success",
  Message = "message",
  Notify = "notify",
  Warning = "warning"
}

export enum AlertifyPosition{
  TopCenter = "top-center",
  TopRight = "top-right",
  TopLeft = "top-left",
  BottomRight = "bottom-right",
  BottomCenter = "bottom-center",
  BottomLeft = "bottom-left"
}
