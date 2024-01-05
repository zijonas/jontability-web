import { Component, OnInit, OnDestroy, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { Post } from '../../core/model/post';
import { PostService } from '../../core/services/post.service';
import { PostSumService } from '../../core/services/post-sum.service';
import { CategoryService } from '../../core/services/category.service';
import { AccountService } from '../../core/services/account.service';
import { Account } from '../../core/model/account';
import { PostFilterService } from '../../core/filter/post-filter.service';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  filteredPosts: Post[] = [];

  selectedAccount: Account = null;
  post: Post = new Post();
  day: number;
  saldo: number;

  addPostForm = new FormGroup({
    isInvoice: new FormControl(''),
    dayOfMonth: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    account: new FormControl('', [Validators.required]),
    value: new FormControl('', [Validators.required])
  }, {
    updateOn: "blur"
  });

  private postSub$: Subscription;

  constructor(
    public postService: PostService,
    private postSumService: PostSumService,
    public categoryService: CategoryService,
    public accountService: AccountService,
    private filterService: PostFilterService) {
  }

  ngOnInit() {
    this.categoryService.loadAll();
    this.accountService.loadAll();
    this.postService.loadAll();
    this.addPostForm.valueChanges.subscribe(() => console.log("changes"));
    this.postSub$ = this.postService.entities$.subscribe(this.init.bind(this));
  }

  ngOnDestroy(): void {
    this.postSub$.unsubscribe();
  }

  init(posts: Post[]) {
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
    this.post.date.setDate(Number(this.addPostForm.value.dayOfMonth));
    this.post.date.setMonth(this.postService.filter.month);
    this.post.accountId = (this.addPostForm.value.account as any).id;
    this.post.value = Number(this.addPostForm.value.value);
    this.post.description = this.addPostForm.value.description;
    this.post.categoryId = Number(this.addPostForm.value.category);
    this.postService.add(this.post);
    this.resetPost();
  }

  inputDisabled() {
    const allSet = !!this.postService.filter.month && !!this.postService.filter.year && !!this.selectedAccount;
    return !allSet;
  }

  resetPost() {
    this.post.value = null;
    this.post.description = null;
  }

  select(post: Post) {
    this.post = post;
  }

  setSaldo() {
    this.saldo = this.postSumService.saldo(this.posts);
  }

  doFilter() {
    this.filteredPosts = this.filterService.filter(this.posts, this.selectedAccount);
  }

  selectAccount(account: Account) {
    if (account === this.selectedAccount) {
      this.selectedAccount = null;
    } else {
      this.selectedAccount = account;
    }
    this.doFilter();
  }

  filterChanged() {
    this.postService.reload();
  }
}
