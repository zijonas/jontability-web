import { Component } from '@angular/core';
import { BaseComponent } from '../../core/base/baseComponent';
import { Category } from '../../core/model/category'
import { CategoryService } from '../../core/services/category.service'

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
