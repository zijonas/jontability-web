import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Post } from '../post/entities/post'
import { BaseService } from '../base/baseService';

@Injectable({
  providedIn: 'root'
})
export class PostService extends BaseService<Post> {
  
  serverUrl = 'http://localhost:8080/post';
  
  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  compare(post1: Post, post2: Post): number {
    return new Date(post1.date).getTime() - new Date(post2.date).getTime();
  }
}
