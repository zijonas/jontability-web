import { Injectable } from '@angular/core';
import { Post } from '../post/entities/post';

@Injectable({
  providedIn: 'root'
})
export class PostFilterService {

  constructor() { }

  filter(posts: Post[]) {
    return posts;
  }


}
