import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateProduct } from 'app/contracts/product/create_product';
import { ListProduct } from 'app/contracts/product/list_product';
import { catchError, firstValueFrom, Observable, of } from 'rxjs';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService: HttpClientService) { }

  errorMessage:String;

   async create(product:CreateProduct,successCallBack?:()=>void,errorCallBack?:(error)=>void):Promise<CreateProduct>{
    const observable:Observable<any|CreateProduct>= this.httpClientService.post<CreateProduct>({
      controller:"products",
    },product)
    const addedProduct:CreateProduct= await firstValueFrom(observable) as CreateProduct;
    //successCallBack();
    //errorCallBack(this.errorMessage);
    return addedProduct;
  }

}
