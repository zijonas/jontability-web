import { CategoryPipe } from './category.pipe';
import { CategoryService } from '../services/category.service';

describe('CategoriePipe', () => {
  it('create an instance', () => {
    const pipe = new CategoryPipe(new CategoryService(null));
    expect(pipe).toBeTruthy();
  });
});
