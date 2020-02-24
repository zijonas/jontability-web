import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Category } from '../category/category';
import { BaseService } from '../base/baseService';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseService<Category> {

  protected serverUrl = 'http://localhost:8080/category';
  
  constructor(httpClient: HttpClient) {
    super(httpClient);
   }
}
