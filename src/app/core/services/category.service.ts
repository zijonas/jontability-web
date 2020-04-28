import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Category} from '../category/category';
import {BaseService} from '../base/baseService';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseService<Category> {

  protected serverUrl = '/api/category';

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  compare(cat1: Category, cat2: Category): number {
    return cat1.name.localeCompare(cat2.name);
  }
}
