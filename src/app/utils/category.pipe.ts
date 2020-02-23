import { Pipe, PipeTransform } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Category } from '../category/category';

@Pipe({
  name: 'category'
})
export class CategoryPipe implements PipeTransform {

  categories: Category[];

  constructor(private categoryService : CategoryService){
    categoryService.register((cats) => this.categories = cats);
  }

  transform(value: number, ...args: any[]): string {
    return this.categories.find(i => i.id == value).name;
  }

}
