import { Component } from '@angular/core';
import { BaseComponent } from '../../core/base/baseComponent';
import { Category } from '../../core/model/category'
import { CategoryService } from '../../core/services/category.service'

@Component({
  template: `
    <div class="box">
      <h2 class="page-title">Categorias</h2>
      <card-editor 
        (add)="add()"
        (delete)="delete()"
        (clear)="clear()"
        [entity]="entity">
      </card-editor>
      <card-list 
        [entity]="entity"
        [entities]="entities"
        (onSelect)="onSelect($event)">
      </card-list>
    </div>
  `
})
export class CategoryComponent extends BaseComponent<Category> {

  constructor(categoryService: CategoryService) {
    super(categoryService, Category);
  }

}
