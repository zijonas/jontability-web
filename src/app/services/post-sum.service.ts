import { Injectable, OnInit } from '@angular/core';
import { PostService } from './post.service';
import { HttpClient } from '@angular/common/http';
import { MonthInfo } from '../post/entities/monthInfo';
import { Post } from '../post/entities/post';
import { range } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostSumService implements OnInit {

  monthsInfo: MonthInfo[]; 
  posts: Post[];

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.postService.register(this.loadAll);
  }

  getAllMonthsForYear(year: number) {
    range(1,12).forEach((val) => {
      this.monthsInfo.push(this.getMonthInfo(val));
    });
  }

  private loadAll(posts: Post[]) {
    this.posts = posts;
  }

  private getMonthInfo (monthNumber: number) {
    return {
      month: new Date(2020, monthNumber, 1),
      sum: 0,
    };
  }

}
