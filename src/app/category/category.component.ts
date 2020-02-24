import { Component } from '@angular/core';
import { BaseComponent } from '../base/baseComponent';
import { Category } from './category'
import { CategoryService } from '../services/category.service'

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent extends BaseComponent<Category> {

  constructor(categoryService: CategoryService) {
    super(categoryService, Category);
  }

}
