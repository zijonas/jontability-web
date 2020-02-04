import { Injectable, OnInit, ɵAPP_ID_RANDOM_PROVIDER } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Category } from '../category/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  
  constructor(private httpClient: HttpClient) { }
  
  private serverUrl = 'http://localhost:8080/category';

  categories: Category[];
  observers = [];

  delete(id: number) {
    this.httpClient.delete(this.serverUrl + '/' + id)
    .subscribe(this.loadAll.bind(this));
  }
  
  add(category: Category) {
    this.httpClient.post<Category>(this.serverUrl, category)
    .subscribe((category) => {
      this.categories.push(category);
      this.notifyAll();
    });
  }
  
  register(observer: (cats: Category[]) => void) {
    this.observers.push(observer);
    if(this.categories) {
      observer(this.categories);
    } else {
      this.loadAll();
    }
  }
  
  private loadAll() {
    this.httpClient.get<Category[]>(this.serverUrl)
      .subscribe((cats) => {
        this.categories = cats;
        this.notifyAll();
      });
  }

  private notifyAll(){
    this.observers.forEach(value => value(this.categories));
  }
}
