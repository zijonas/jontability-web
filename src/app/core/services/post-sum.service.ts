import { Injectable, OnInit } from '@angular/core';
import { PostService } from './post.service';
import { MonthInfo } from '../model/monthInfo';
import { Post } from '../model/post';
import { range } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostSumService {

  sumPerMonth(posts: Post[]): MonthInfo[] {
    let sums: MonthInfo[] = [];
    range(0, 12).forEach((val) => {
      let sum = posts.filter((i) => new Date(i.date).getMonth() == val)
        .map(p => this.calculatedValue(p))
        .reduce((acum, val) => acum + val, 0);
      sums.push(new MonthInfo(val, sum));
    });
    return sums;
  }

  allExistingYears(posts: Post[]): number[] {
    return posts.map(i => new Date(i.date).getFullYear()).filter((value, index, self) => self.indexOf(value) === index);
  }

  saldo(posts: Post[]) {
    return posts.map(p => this.calculatedValue(p)).
      reduce((acc, val) => { return acc + val }, 0);
  }

  calculatedValue(post: Post) {
    return post.invoice ? post.value : -post.value;
  }
}
