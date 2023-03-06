import { Injectable } from '@angular/core';
import { CategoryResponse } from 'app/contracts/category/category_response';
import { ListObject } from 'app/contracts/common/list_object';
import { firstValueFrom, Observable } from 'rxjs';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClientService:HttpClientService) { }

  async create(category:CategoryResponse):Promise<CategoryResponse>{
    const observable:Observable<any|CategoryResponse>= this.httpClientService.post<CategoryResponse>({
      controller:"categories",
    },category)
    const addedCategory:CategoryResponse= await firstValueFrom(observable) as CategoryResponse;
    return addedCategory;
  }

  async list(page:number=0, size:number=10):Promise<ListObject>{
    const observable:Observable<ListObject>=this.httpClientService.get({
      controller:"categories",
      queryString:`page=${page}&pageSize=${size}`
    })
    return await firstValueFrom(observable) as ListObject;
  }

  async update(category:CategoryResponse):Promise<CategoryResponse>{
    const observable:Observable<any|CategoryResponse>= this.httpClientService.put<CategoryResponse>({
      controller:"categories",
    },category)
    const updatedCategory:CategoryResponse= await firstValueFrom(observable) as CategoryResponse;
    return updatedCategory;
  }

  async delete(id:string):Promise<CategoryResponse>{
    const observable:Observable<any|CategoryResponse>= this.httpClientService.delete({
      controller:"categories",
    },id);
    const deletedCategory:CategoryResponse= await firstValueFrom(observable) as CategoryResponse;
    return deletedCategory;
  }
}
