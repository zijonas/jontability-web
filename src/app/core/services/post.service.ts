import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Post} from '../model/post';
import {BaseService} from '../base/baseService';

@Injectable({
  providedIn: 'root'
})
export class PostService extends BaseService<Post> {

  serverUrl = '/api/post';

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  compare(post1: Post, post2: Post): number {
    return new Date(post1.date).getTime() - new Date(post2.date).getTime();
  }
}
