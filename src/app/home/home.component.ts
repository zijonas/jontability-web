import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { PostService } from '../services/post.service';
import { Post } from '../post/entities/post';
import { Category } from '../category/category';
import { Account } from '../account/account';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-home',
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
    this.postService.getAll().then(posts => this.posts = posts);
    this.categoryService.getAll().then(cats => this.categories = cats);
    this.accountService.getAll().then(accs => this.accounts = accs);
  }

  navigate(dest: string) {
    this.router.navigateByUrl(dest);
  }
}
