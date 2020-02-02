import { Component, OnInit } from '@angular/core';
import { Category } from './category'
import { CategoryService } from '../services/category.service'


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  
  category: Category = new Category();
  categories: Category[] = [];

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryService.register(this.reloadCategories.bind(this));
  }

  onSelect(item: Category) {
    console.log(item);
    // this.category = item;
  }

  add() {
    this.categoryService.addItem(this.category);
    this.category = new Category();
  }

  reloadCategories() {
    this.categoryService.loadAll()
    .subscribe(cat => this.categories = cat);
  }

  remove(id: number) {
    this.categoryService.removeItem(id);
  }

}
