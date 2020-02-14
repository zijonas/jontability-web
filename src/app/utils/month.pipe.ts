import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'month'
})
export class MonthPipe implements PipeTransform {

  monthNames = [ 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
            'Julho', 'Augosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

  transform(value: number): string {
    return this.monthNames[value];
  }

}
