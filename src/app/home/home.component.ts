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

  private posts: Post[] = [];
  private categories: Category[] = [];
  private accounts: Account[] = [];

  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private accountService: AccountService,
    private postService: PostService) { }

  ngOnInit(): void {
    this.postService.register(posts => this.posts = posts);
    this.categoryService.register(cats => this.categories = cats);
    this.accountService.register(accs => this.accounts = accs);
  }

  navigate(dest: string) {
    this.router.navigateByUrl(dest);
  }
}
