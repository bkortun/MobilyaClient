import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dynamic } from 'app/contracts/common/dynamic_query';
import { ListObject } from 'app/contracts/common/list_object';
import { AddCategoryProduct } from 'app/contracts/product/addCategory_product';
import { CreateProduct } from 'app/contracts/product/create_product';
import { DeleteProduct } from 'app/contracts/product/delete_product';
import { Product } from 'app/contracts/product/product';
import { UpdateProduct } from 'app/contracts/product/update_product';
import { catchError, firstValueFrom, Observable, of } from 'rxjs';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService: HttpClientService) { }

  errorMessage:String;

   async create(product:CreateProduct,callBackFunction?:()=>void):Promise<CreateProduct>{
    const observable:Observable<any|CreateProduct>= this.httpClientService.post<CreateProduct>({
      controller:"products",
    },product)
    const addedProduct:CreateProduct= await firstValueFrom(observable) as CreateProduct;
    callBackFunction();
    return addedProduct;
  }

  async list(page:number=0, size:number=5):Promise<ListObject>{
    const observable:Observable<ListObject>=this.httpClientService.get({
      controller:"products",
      queryString:`page=${page}&pageSize=${size}`
    })
    return await firstValueFrom(observable) as ListObject;
  }

  async listDynamic(dynamic:Dynamic,page:number=0, size:number=5):Promise<ListObject>{
    const observable:Observable<Dynamic>=this.httpClientService.post<Dynamic>({
      controller:"products",
      action:"listDynamic",
      queryString:`page=${page}&pageSize=${size}`
    },dynamic)
    return await firstValueFrom(observable) as ListObject;
  }

  async update(product:UpdateProduct,callBackFunction?:()=>void):Promise<UpdateProduct>{
    const observable:Observable<any|UpdateProduct>= this.httpClientService.put<UpdateProduct>({
      controller:"products",
    },product)
    const updatedProduct:UpdateProduct= await firstValueFrom(observable) as UpdateProduct;
    callBackFunction();
    return updatedProduct;
  }

  async delete(id:string,callBackFunction?:()=>void):Promise<DeleteProduct>{
    const observable:Observable<any|DeleteProduct>= this.httpClientService.delete({
      controller:"products",
    },id);
    const deletedProduct:DeleteProduct= await firstValueFrom(observable) as DeleteProduct;
    callBackFunction();
    return deletedProduct;
  }

  async addCategory(body:AddCategoryProduct, callBackFunction?:()=>void){
    const observable:Observable<any|DeleteProduct>= this.httpClientService.post({
      controller:"products",
      action:"addCategory"
    },body);
    const addedCategory= await firstValueFrom(observable);
    callBackFunction();
    return addedCategory;
  }

  async listById(id:string):Promise<Product>{
    const observable:Observable<Product>=this.httpClientService.get({
      controller:"products",
      //queryString:`id=${id}`
    },id)
    return await firstValueFrom(observable) as Product;
  }

  async listByCategoryId(page:number=0, size:number=5,categoryId:string):Promise<ListObject>{
    const observable:Observable<ListObject>=this.httpClientService.get({
      controller:"products",
      action:"listByCategoryId",
      queryString:`page=${page}&pageSize=${size}`
    },categoryId)
    return await firstValueFrom(observable) as ListObject;
  }
}
