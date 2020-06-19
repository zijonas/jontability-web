import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../../core/services/category.service';
import { PostService } from '../../core/services/post.service';
import { AccountService } from '../../core/services/account.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private accountService: AccountService,
    private postService: PostService) { }

  ngOnInit(): void {
    this.categoryService.loadAll();
    this.accountService.loadAll();
    this.postService.loadAll();
  }

  navigate(dest: string) {
    this.router.navigateByUrl(dest);
  }
}
