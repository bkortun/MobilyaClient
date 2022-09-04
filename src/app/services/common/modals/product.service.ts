import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateProduct } from 'app/contracts/product/create-product';
import { ListProduct } from 'app/contracts/product/list_product';
import { firstValueFrom, Observable } from 'rxjs';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService:HttpClientService) { }

  create(product:CreateProduct,callBackFunction?:()=>void){
    this.httpClientService.post({
      controller:"products",
    },product).subscribe(result=>{
      callBackFunction();
    })
  }

  async list(pageIndex:number=0,pageSize:number=5, successCallBack?: ()=>void, errorCallBack?: (errorMessage:string)=>void):Promise<{totalCount:number,items:ListProduct[]}>{
    const observable:Observable<{totalCount:number,items:ListProduct[]}>=this.httpClientService.get<{totalCount:number,items:ListProduct[]}>({
      controller:"products",
      queryString:`pageIndex=${pageIndex}&pageSize=${pageSize}`
    });


    return await firstValueFrom(observable) as {totalCount:number,items:ListProduct[]};
  }
}
