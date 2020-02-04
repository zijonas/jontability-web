import { Injectable, OnInit, ɵAPP_ID_RANDOM_PROVIDER } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Category } from '../category/category';
import { Observable, Observer, observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  
  constructor(private httpClient: HttpClient) { }
  
  serverUrl = 'http://localhost:8080/restapi/category';

  categories: Category[];
  observers = [];

  
  delete(id: number) {
    this.httpClient.delete(this.serverUrl + '/' + id)
    .subscribe(() => {
      this.loadAll();
    });
  }
  
  add(category: Category) {
    this.httpClient.post<Category>(this.serverUrl, category)
    .subscribe((category) => {
      this.categories.push(category);
      this.notifyAll.bind(this)
    });
  }
  
  register(observer: (observable: Category[]) => void) {
    this.observers.push(observer);
    observer(this.categories);
  }
  
  private loadAll() {
    this.httpClient.get<Category[]>(this.serverUrl)
      .subscribe((categories) => {
        this.categories = categories;
        this.notifyAll();
      });
  }

  private notifyAll(){
    this.observers.forEach((value) => {
      value(this.loadAll());
    })
  }
}
