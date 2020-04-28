import { Pipe, PipeTransform } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Category } from '../model/category';

@Pipe({
  name: 'category'
})
export class CategoryPipe implements PipeTransform {

  categories: Category[];

  constructor(private categoryService : CategoryService){
    categoryService.getAll().then(this.init.bind(this));
    categoryService.register(this.init.bind(this));
  }

  init(cats: Category[]) {
    this.categories = cats
  }

  transform(value: number, ...args: any[]): string {
    return this.categories.find(i => i.id == value).name;
  }

}
