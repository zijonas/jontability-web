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
    this.categoryService.register(this.load.bind(this));
  }

  add() {
    this.categoryService.add(this.category);
    this.category = new Category();
  }

  load(categories: Category[]) {
    this.categories = categories;
  }

  delete(id: number) {
    this.categoryService.delete(id);
  }

}
