import { Injectable } from '@angular/core';
import { Post } from '../post/entities/post';

@Injectable({
  providedIn: 'root'
})
export class PostFilterService {

  constructor() { }

  private execFilter(posts: Post[], filters: ((post: Post) => boolean)[]) {
    return posts.filter(post => {
      return filters.map(filter => filter(post)).reduce((f1, f2) => f1 && f2, true);
    });
  }

  filter(posts: Post[], accountId: number, year?: number, month?: number) {
    let filterChain = new Array(this.filterByAccount(accountId));
    if(month && month != null) {
      filterChain.push(this.filterByMonth(month))
    }
    if(year && year != null) {
      filterChain.push(this.filterByYear(year))
    }
    return this.execFilter(posts, filterChain);
  }

  private filterByMonth(month: number) {
    return (post: Post) => new Date(post.date).getMonth() == month;
  }

  private filterByYear(year: number) {
    return (post: Post) => new Date(post.date).getFullYear() == year;
  }

  private filterByAccount(accountId: number) {
    return (post: Post) => post.accountId == accountId;
  }

}
