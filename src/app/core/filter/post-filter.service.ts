import { Injectable } from '@angular/core';
import { Post } from '../model/post';
import { Account } from '../model/account';

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

  filter(posts: Post[], account: Account) {
    let filterChain = [];

    if(!posts) {
      return;
    }

    if(account !== null) {
      filterChain.push(this.filterByAccount(account.id));
    }
    // if(month >= 0) {
    //   console.log(month)
    //   filterChain.push(this.filterByMonth(month))
    // }
    // if(year != 0) {
    //   filterChain.push(this.filterByYear(year))
    // }

    if(filterChain.length > 0) {
      return this.execFilter(posts, filterChain);
    } else {
      return posts;
    }
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
