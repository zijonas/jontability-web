import { Component, OnInit } from '@angular/core';
import { Post } from './post';
import { Observable } from 'rxjs';
import { PostService } from '../services/post.service';
import { Category } from '../category/category';
import { CategoryService } from '../services/category.service';
import { AccountService } from '../services/account.service';
import { Account } from '../account/account';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  constructor(
    private postService: PostService, 
    private categoryService: CategoryService,
    private accountService: AccountService) { }


  selectedDate: Date = new Date();
  posts: Post[] = [];
  categories: Category[] = [];
  accounts: Account[] = [];
  post: Post = new Post();
  day: number;
  sum: number;

  ngOnInit() {
    this.postService.register(this.loadAll.bind(this));
    this.categoryService.register(((cats: Category[]) => {this.categories = cats}).bind(this));
    this.accountService.register(((accs: Account[]) => this.accounts = accs).bind(this));
  }

  loadAll(observable: Observable<Post[]>) {
    observable.subscribe(posts => {
      this.posts = posts;
      this.sum = this.total();
    });
  }

  add() {
    this.post.date = new Date();
    this.post.date.setDate(this.day);
   
    this.postService.addItem(this.post);

    this.resetPost();
  }

  resetPost() {
    this.post.value = null;
    this.post.description = null;
  }

  delete(id: number) {
    this.postService.removeItem(id);
  }

  total() {
    return this.posts.map((item) => item.invoice ? item.value : -item.value).
    reduce((acc, val) => {return acc + val});
  }

  categoryName(id: number) {
    if(this.categories.length > 0) {
      return this.categories.filter((cat) => cat.id == id).map((cat) => cat.name);
    }
  }

  accountName(id: number) {
    if(this.accounts.length > 0) {
      return this.accounts.filter((acc) => acc.id == id).map((acc) => acc.name);
    }
  }
}
