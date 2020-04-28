import { Component, OnInit } from '@angular/core';
import { Post } from '../core/model/post';
import { PostService } from '../core/services/post.service';
import { PostSumService } from '../core/services/post-sum.service';
import { Category } from '../core/model/category';
import { CategoryService } from '../core/services/category.service';
import { AccountService } from '../core/services/account.service';
import { Account } from '../core/model/account';
import { MonthInfo } from '../core/model/monthInfo';
import { PostFilterService } from '../core/filter/post-filter.service';

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
  saldo: number;

  constructor(
    private postService: PostService,
    private postSumService: PostSumService,
    private categoryService: CategoryService,
    private accountService: AccountService,
    private filterService: PostFilterService) { }

  ngOnInit() {
    this.categoryService.getAll()
      .then((cats: Category[]) => {
        this.categories = cats;
        return this.accountService.getAll();
      })
      .then((accs: Account[]) => {
        this.accounts = accs;
        return this.postService.getAll();
      })
      .then((posts: Post[]) => {
        this.selectedAccount = this.accounts[0].id;
        this.init(posts);
      });
    this.categoryService.register(((cats: Category[]) => this.categories = cats).bind(this));
    this.accountService.register(((accs: Account[]) => this.accounts = accs).bind(this));
    this.postService.register(this.init.bind(this));
  }

  init(posts: Post[]) {
    this.posts = posts;
    this.filter();
    this.setSaldo();
    this.loadSumPerMoth();
    this.existingYears = this.postSumService.allExistingYears(this.posts);
  }

  private loadSumPerMoth() {
    this.sumPerMonth = this.postSumService.sumPerMonth(this.selectedYear, this.posts);
  }

  add() {
    this.post.date = new Date();
    this.post.date.setDate(this.day);
    this.post.date.setMonth(this.selectedMonth);
    this.postService.add(this.post);
    this.resetPost();
  }

  inputActive() {
    return this.selectedMonth != null && this.selectedYear != null && this.selectedAccount != null;
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

  setSaldo() {
    this.saldo = this.postSumService.saldo(this.filteredPosts);
  }

  filter() {
    this.filteredPosts = this.filterService.filter(this.posts, this.selectedAccount, this.selectedYear, this.selectedMonth);
  }

  selectAccount(account: number) {
    if (account === this.selectedAccount) {
      this.selectedAccount = 0;
    } else {
      this.selectedAccount = account;
    }
    this.filter();
    this.setSaldo();
  }

  selectMonth(month: number) {
    if (month === this.selectedMonth) {
      this.selectedMonth = -1;
    } else {
      this.selectedMonth = month;
    }
    this.filter();
    this.setSaldo();
  }

  selectYear(year: number) {
    if (year == this.selectedYear) {
      this.selectedYear = 0;
    } else {
      this.selectedYear = year;
    }
    this.filter();
    this.setSaldo();
    this.loadSumPerMoth();
  }

}
