import { Component, OnInit } from '@angular/core';
import { Post } from './entities/post';
import { PostService } from '../services/post.service';
import { PostSumService } from '../services/post-sum.service';
import { Category } from '../category/category';
import { CategoryService } from '../services/category.service';
import { AccountService } from '../services/account.service';
import { Account } from '../account/account';
import { MonthInfo } from './entities/monthInfo';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  displayedColumns: string[] = ['date', 'category', 'description', 'value', 'delete'];
  posts: Post[] = [];
  
  filteredPosts: Post[] = [];
  selectedAccount: number;
  selectedMonth: number = new Date().getMonth();
  selectedYear: number = new Date().getFullYear();

  sumPerMonth: MonthInfo[];

  categories: Category[] = [];
  accounts: Account[] = [];
  existingYears: number[];
  post: Post = new Post();
  day: number;
  sum: number;

  constructor(
    private postService: PostService,
    private postSumService: PostSumService,
    private categoryService: CategoryService,
    private accountService: AccountService) { }

  ngOnInit() {
    this.postService.register(this.loadAll.bind(this));
    this.categoryService.register(((cats: Category[]) => { this.categories = cats }).bind(this));
    this.accountService.register(((accs: Account[]) => { this.accounts = accs; this.selectedAccount = accs[0].id}).bind(this));
  }

  loadAll(posts: Post[]) {
    this.posts = posts;
    this.filteredPosts = this.filterList();
    this.sum = this.total();
    this.loadSumPerMoth();
    this.existingYears = this.postSumService.allExistingYears(this.posts);
  }
  
  private loadSumPerMoth () {
    this.sumPerMonth = this.postSumService.sumPerMonth(this.selectedYear, this.posts);
  }

  add() {
    this.post.date = new Date();
    this.post.date.setDate(this.day);
    this.post.date.setMonth(this.selectedMonth);
    this.postService.add(this.post);
    this.resetPost();
  }

  resetPost() {
    this.post.value = null;
    this.post.description = null;
  }

  delete(id: number) {
    this.postService.delete(id);
  }

  select(post: Post) {
    this.post = post;
  }

  total() {
    return this.filteredPosts.map((item) => item.invoice ? item.value : -item.value).
      reduce((acc, val) => { return acc + val }, 0);
  }

  categoryName(id: number) {
    if (this.categories.length > 0) {
      return this.categories.filter((cat) => cat.id == id).map((cat) => cat.name);
    }
  }

  accountName(id: number) {
    if (this.accounts.length > 0) {
      return this.accounts.filter((acc) => acc.id == id).map((acc) => acc.name);
    }
  }

  onAccountSelection(id: number) {
    this.selectedAccount = id;
    this.post.accountId = id;
    this.filteredPosts = this.filterList();
    this.sum = this.total();
  }
  
  selectMonth(month: number) {
    if(month == this.selectedMonth) {
      this.selectedMonth = -1;
    } else {
      this.selectedMonth = month;
    }
    this.filteredPosts = this.filterList();
    this.sum = this.total();
  }
  
  selectYear(year: number) {
    this.selectedYear = year;
    this.filteredPosts = this.filterList();
    this.sum = this.total();
    this.loadSumPerMoth();
  }
  
  filterList() {
    let f: Post[] = this.posts;
    if(this.selectedYear) {
      f = f.filter((i) => new Date(i.date).getFullYear() == this.selectedYear);
    }
    if(this.selectedMonth >= 0) {
      f = f.filter((i) => new Date(i.date).getMonth() == this.selectedMonth);
    }
    if(this.selectedAccount) {
      f = f.filter((p) => p.accountId == this.post.accountId);
    }
    return f;
  }
}
