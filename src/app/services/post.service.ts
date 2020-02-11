import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Post } from '../post/entities/post'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  serverUrl = 'http://localhost:8080/post';

  posts: Post[];
  observers = [];

  constructor(private httpClient: HttpClient) { }

  delete(id: number) {
    this.httpClient.delete(this.serverUrl + '/' + id)
    .subscribe(() => {
      let index = this.posts.findIndex(i => i.id == id);
      this.posts.splice(index, 1);
      this.notifyAll();
    });
  }
  
  add(post: Post) {
    this.httpClient.post<Post>(this.serverUrl, post)
    .subscribe(post => {
      let index = this.posts.findIndex(i => i.id == post.id);
      this.posts.push(post);
      this.notifyAll();
    });
  }
  
  register(observer: (posts: Post[]) => void) {
    this.observers.push(observer);
    if(!this.posts) {
      this.loadAll(null, null);
    }
    observer(this.posts);
  }

  private notifyAll() {
    this.observers.forEach(observer => observer(this.posts));
  }
  
  private loadAll(from: Date, to: Date) {
    this.httpClient.get<Post[]>(this.serverUrl)
    .subscribe(posts => {
      this.posts = posts;
      this.notifyAll();
    });
  }
}
