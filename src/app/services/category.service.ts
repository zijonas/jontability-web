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

  categories: Observable<Category[]>;
  observers = [];


  loadAll(): Observable<Category[]> {
    this.categories = this.httpClient.get<Category[]>(this.serverUrl);
    return this.categories;

  }

  removeItem(id: number) {
    this.httpClient.delete(this.serverUrl + '/' + id).toPromise()
    .then(this.notifyAll.bind(this));
  }

  addItem(category: Category) {
    this.httpClient.post(this.serverUrl, category).toPromise()
    .then(this.notifyAll.bind(this));
  }

  register(observer: (observable: Observable<Category[]>) => void) {
    this.observers.push(observer);
    observer(this.loadAll());
  }

  private notifyAll(){
    this.observers.forEach((value) => {
      value(this.loadAll());
    })
  }
}
