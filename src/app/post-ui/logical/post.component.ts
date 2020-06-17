import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../../core/model/post';
import { PostService } from '../../core/services/post.service';
import { PostSumService } from '../../core/services/post-sum.service';
import { Category } from '../../core/model/category';
import { CategoryService } from '../../core/services/category.service';
import { AccountService } from '../../core/services/account.service';
import { Account } from '../../core/model/account';
import { MonthInfo } from '../../core/model/monthInfo';
import { PostFilterService } from '../../core/filter/post-filter.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  filteredPosts: Post[] = [];
  categories: Category[] = [];
  accounts: Account[] = [];
  existingYears: number[] = [];

  selectedAccount: Account = null;
  post: Post = new Post();
  day: number;
  saldo: number;

  private static initialized: boolean = false;

  constructor(
    private postService: PostService,
    private postSumService: PostSumService,
    private categoryService: CategoryService,
    private accountService: AccountService,
    private filterService: PostFilterService) {
  }

  ngOnInit() {
    if(!PostComponent.initialized) {
      this.categoryService.entities$.subscribe(categories => this.categories = categories);
      this.accountService.entities$.subscribe(accounts => this.accounts = accounts);
      this.postService.entities$.subscribe(this.init.bind(this));
    }
  }

  ngOnDestroy(): void {
  }
  
  init(posts: Post[]) {
    console.log('init');
    if (posts !== null) {
      this.posts = posts;
      this.doFilter();
      this.setSaldo();
      this.postService.reloadSumPerMonth();
      this.postService.reloadYears();
    }
  }

  add() {
    this.post.date = new Date();
    this.post.date.setDate(this.day);
    this.post.date.setMonth(this.postService.filter.month);
    this.post.accountId = this.selectedAccount.id
    this.postService.add(this.post);
    this.resetPost();
  }

  inputActive() {
    return this.postService.filter.month !== null && this.postService.filter.year !== null && this.selectedAccount !== null;
  }

  resetPost() {
    this.post.value = null;
    this.post.description = null;
  }

  select(post: Post) {
    this.post = post;
  }

  setSaldo() {
    this.saldo = this.postSumService.saldo(this.filteredPosts);
  }

  doFilter() {
    this.filteredPosts = this.filterService.filter(this.posts, this.selectedAccount);
    console.log('Filter posts');
    console.log(this.posts);
    console.log(this.filteredPosts);
    
  }

  selectAccount(account: Account) {
    if (account === this.selectedAccount) {
      this.selectedAccount = null;
    } else {
      this.selectedAccount = account;
    }
    console.log(this.selectedAccount)
  }

  filterChanged(z: string) {
    this.postService.reload();
  }
}
