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

  constructor(
    private postService: PostService,
    private postSumService: PostSumService,
    private categoryService: CategoryService,
    private accountService: AccountService) { }


  posts: Post[] = [];
  filteredPosts: Post[] = [];
  sumPerMonth: MonthInfo[];
  categories: Category[] = [];
  accounts: Account[] = [];
  selectedMonth: number = new Date().getMonth();
  selectedAccount: number;
  post: Post = new Post();
  day: number;
  sum: number;

  ngOnInit() {
    this.postService.register(this.loadAll.bind(this));
    this.categoryService.register(((cats: Category[]) => { this.categories = cats }).bind(this));
    this.accountService.register(((accs: Account[]) => this.accounts = accs).bind(this));
  }

  loadAll(posts: Post[]) {
    this.posts = posts;
    this.filteredPosts = this.filterList();
    this.sum = this.total();
    this.sumPerMonth = this.postSumService.sumPerMonth(new Date().getFullYear(), this.posts);
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

  total() {
    return this.filteredPosts.map((item) => item.invoice ? item.value : -item.value).
      reduce((acc, val) => { return acc + val });
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

  onAccountSelection() {
    this.selectedAccount = this.post.accountId;
    this.filteredPosts = this.filterList();
    this.sum = this.total();
  }
  
  selectMonth(month: number) {
    this.selectedMonth = month;
    this.filteredPosts = this.filterList();
    this.sum = this.total();
  }
  
  filterList() {
    let f: Post[] = this.posts;
    if(this.selectMonth) {
      f = f.filter((i) => new Date(i.date).getMonth() == this.selectedMonth);
      console.log(f);
    }
    if(this.selectedAccount) {
      f = f.filter((p) => p.accountId == this.post.accountId);
    }
    return f;
  }
}
