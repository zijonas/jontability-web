import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Post} from '../model/post';
import {BaseService} from '../base/baseService';
import { PostFilter } from '../filter/post-filter';
import { MonthInfo } from '../model/monthInfo';

@Injectable({
  providedIn: 'root'
})
export class PostService extends BaseService<Post> {

  serverUrl = '/api/post';
  filter: PostFilter = new PostFilter();
  years: number[] = []
  sumPerMonth: MonthInfo[] = [];

  constructor(httpClient: HttpClient) {
    super(httpClient);
    
    let now = new Date();
    this.filter.month = now.getMonth();
    this.filter.year = now.getFullYear();
  }

  compare(post1: Post, post2: Post): number {
    return new Date(post1.date).getTime() - new Date(post2.date).getTime();
  }

  reload(): void {
    this.getHttpClient().post<Post[]>(`${this.serverUrl}/fetch`, this.filter)
    .subscribe(response => this.updateData(this.sort(response)));
  }

  reloadYears() {
    this.getHttpClient().get<number[]>(`${this.serverUrl}/years`)
    .subscribe(response => this.years = response);
  }

  reloadSumPerMonth() {
    this.getHttpClient().get<MonthInfo[]>(`${this.serverUrl}/sum-per-month-by-year/${this.filter.year}`)
    .subscribe(response => this.sumPerMonth = response);
  }
}
