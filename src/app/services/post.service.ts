import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Post } from '../post/post'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  serverUrl = 'http://localhost:8080/restapi/post';

  posts: Observable<Post[]>;
  observers = [];

  constructor(private httpClient: HttpClient) { }

  loadAll(): Observable<Post[]> {
    // httpParams = new HttpParams();

    this.posts = this.httpClient.get<Post[]>(this.serverUrl);
    return this.posts;
  }

  removeItem(id: number) {
    this.httpClient.delete(this.serverUrl + '/' + id)
      .subscribe(this.notifyAll.bind(this));
  }

  addItem(post: Post) {
    this.httpClient.post(this.serverUrl, post)
      .subscribe(this.notifyAll.bind(this));
  }

  notifyAll() {
    this.observers.forEach((item) => item(this.loadAll()));
  }

  register(observer: (observable: Observable<Post[]>) => void) {
    this.observers.push(observer);
    observer(this.loadAll());
  }
}
