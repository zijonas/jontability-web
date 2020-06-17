import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../../core/services/category.service';
import { PostService } from '../../core/services/post.service';
import { Post } from '../../core/model/post';
import { Category } from '../../core/model/category';
import { Account } from '../../core/model/account';
import { AccountService } from '../../core/services/account.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  posts: Post[] = [];
  categories: Category[] = [];
  accounts: Account[] = [];

  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private accountService: AccountService,
    private postService: PostService) { }

  ngOnInit(): void {
    this.categoryService.register(categories => this.categories = categories);
    this.accountService.register(accounts => this.accounts = accounts);
    this.postService.register(posts => this.posts = posts);
  }

  navigate(dest: string) {
    this.router.navigateByUrl(dest);
  }
}
